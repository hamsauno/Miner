function loadPreorderData() {
    fetch('https://hamsauno.github.io/Miner/json/data.json')
        .then(response => response.json())
        .then(data => {
            if (data && data["Предзаказ"]) {
                const preorder = data["Предзаказ"];
                const container = document.getElementById("preorder-container");

                if (!container) {
                    console.error("Контейнер с id 'preorder-container' не найден");
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
                    const price = item["Цена"] || "Неизвестная цена";
                    const preorderPrice = item["Цена (предзаказ)"] || "Неизвестная цена предзаказа";

                    const priceValue = parseFloat(preorderPrice) || 0;
                    let rubPrice = priceValue * priceUSDT;

                    const rubRounded = Math.ceil(rubPrice / 100) * 100;
                    const rubFormatted = rubRounded.toLocaleString('ru-RU').replace(/,/g, ' ');

                    // НДС
                    const NDCusdtRounded = Math.ceil((priceValue * 1.2)/10) * 10;
                    const NDCrubRounded = Math.ceil((NDCusdtRounded * priceUSDT)/100) * 100;

                    div.innerHTML = `
                        <p>${model} ${hashRate} ${hashsec} — ${rubFormatted} ₽ | ${priceValue} $</p>
                    `;

                    // === 👇 Добавляем открытие модального окна при клике ===
                    div.addEventListener("click", () => {
                        const modal = document.getElementById("product-modal");
                        const modalBody = document.getElementById("modal-body");

                        // Формируем ссылку для Telegram-бота
                        const telegramLink = `https://t.me/LEGIT_Mining_APP_Bot?start=main_5765882132`;
                        //const telegramLink = `Добрый день, хочу купить model:${encodeURIComponent(model)}&price:${encodeURIComponent(rubFormatted)}`;

                        modalBody.innerHTML = `
                            <h2>${Manufacturer} ${model}</h2>
                            <p><strong>Хешрейт:</strong> ${hashRate} ${hashsec}</p>
                            <p><strong>Потребление:</strong> ${energycost} Вт</p>
                            <p><strong>Цена предзаказа:</strong> ${rubFormatted} ₽ (${priceValue} $)</p>
                            <p><strong>Цена с НДС:</strong> ${(NDCrubRounded).toLocaleString('ru-RU')} ₽ (${NDCusdtRounded} $)</p>
                            <a href="${telegramLink}" class="buy-button" target="_blank">Хочу купить</a>
                        `; // Закрываем строку корректно

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
