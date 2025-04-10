function loadPreorderData() {
    fetch('https://hamsauno.github.io/Miner/json/data.json')
        .then(response => response.json())
        .then(data => {
            if (data && data["Предзаказ"]) {
                const preorder = data["Предзаказ"];
                const container = document.getElementById("container");

                if (!container) {
                    console.error("Контейнер с id 'container' не найден");
                    return;
                }

                container.innerHTML = '';

                preorder.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("item");

                    const Manufacturer = item["Производитель"] || "Неизвестный Производитель";
                    const model = item["Модель"] || "Неизвестная модель";
                    const hashRate = item["Хешрейт"] || "Неизвестный хешрейт";
                    const energycost = item["Потребление"] || "Неизвестное Потребление";
                    const hashsec = item["Ед. изм."] || "Неизвестная Ед. изм.";

                    const preorderPrice = parseFloat(item["Цена"]) || 0;
                    const priceRF = parseFloat(item["Цена ГТД РФ"]) || 0;
                    const priceRFNDS = parseFloat(item["Цена с ГТД РФ и НДС"]) || 0;

                    // Рассчёты
                    const rubPreorder = Math.ceil((preorderPrice * priceUSDT) / 100) * 100;
                    const rubPreorderNDS = Math.ceil((preorderPrice * 1.2 * priceUSDT) / 100) * 100;

                    const rubRF = Math.ceil((priceRF * priceUSDT) / 100) * 100;
                    const rubRFNDS = Math.ceil((priceRFNDS * priceUSDT) / 100) * 100;

                    div.innerHTML = `
                        <p>${model} ${hashRate} ${hashsec} — ${rubPreorder.toLocaleString('ru-RU')} ₽ | ${preorderPrice} $</p>
                    `;

                    // === Модалка по клику ===
                    div.addEventListener("click", () => {
                        const modal = document.getElementById("product-modal");
                        const modalBody = document.getElementById("modal-body");

                        const telegramLink = `https://t.me/LEGIT_Mining_APP_Bot?start=main_5765882132`;

                        modalBody.innerHTML = `
                            <h2>${Manufacturer} ${model}</h2>
                            <p><strong>Хешрейт:</strong> ${hashRate} ${hashsec}</p>
                            <p><strong>Потребление:</strong> ${energycost} Вт</p>

                            <p><strong>Цена ГТД РБ:</strong> ${rubPreorder.toLocaleString('ru-RU')} ₽ (${preorderPrice} $)</p>
                            <p><strong>Цена ГТД РБ с НДС:</strong> ${rubPreorderNDS.toLocaleString('ru-RU')} ₽ (${Math.ceil(preorderPrice * 1.2)} $)</p>

                            <p><strong>Цена ГТД РФ:</strong> ${rubRF.toLocaleString('ru-RU')} ₽ (${priceRF} $)</p>
                            <p><strong>Цена ГТД РФ с НДС:</strong> ${rubRFNDS.toLocaleString('ru-RU')} ₽ (${priceRFNDS} $)</p>

                            <a href="${telegramLink}" class="buy-button" target="_blank">Хочу купить</a>
                        `;

                        modal.style.display = "block";
                    });

                    container.appendChild(div);
                });
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
        });
}

