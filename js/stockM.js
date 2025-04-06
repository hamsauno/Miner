function loadData() {
    fetch('https://hamsauno.github.io/Miner/json/data.json')
        .then(response => response.json())
        .then(data => {
            if (data && data["Наличие"]) {
                const availability = data["Наличие"];
                const container = document.getElementById("container");

                if (!container) {
                    console.error("Контейнер с id 'container' не найден");
                    return;
                }

                container.innerHTML = '';

                availability.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("item");

                    const Manufacturer = item["Производитель"] || "Неизвестный Производитель";
                    const model = item["Модель"] || "Неизвестная модель";
                    const hashRate = item["Хешрейт"] || "Неизвестный хешрейт";
                    const energycost = item["Потребление"] || "Неизвестное Потребление";
                    const price = item["Цена"] || "Неизвестная цена";

                    const priceValue = parseFloat(price) || 0;
                    let rubPrice = priceValue * priceUSDT;

                    const rubRounded = Math.ceil(rubPrice / 100) * 100;
                    const rubFormatted = rubRounded.toLocaleString('ru-RU').replace(/,/g, ' ');

                    // НДС
                    const NDCusdtRounded = Math.ceil((priceValue * 1.2)/10) * 10;
                    const NDCrubRounded = Math.ceil((NDCusdtRounded * priceUSDT)/100) * 100;

                    div.innerHTML = `
                        <p>${model} ${hashRate} — ${rubFormatted} ₽ | ${priceValue} $</p>
                    `;

                    // === 👇 Добавляем открытие модального окна при клике ===
                    div.addEventListener("click", () => {
                        const modal = document.getElementById("product-modal");
                        const modalBody = document.getElementById("modal-body");

                        // Формируем ссылку для Telegram-бота
                        const telegramLink = `https://t.me/my_super_calc_bot?start=main_5765882132`;
                        //const telegramLink = `Добрый день, хочу купить model:${encodeURIComponent(model)}&price:${encodeURIComponent(rubFormatted)}`;


                        modalBody.innerHTML = `
                            <h2>${Manufacturer}</h2>
                            <p>${modal}</p>
                            <p><strong>Хешрейт:</strong> ${hashRate}</p>
                            <p><strong>Потребление:</strong> ${energycost}<strong>Вт</strong></p>
                            <p><strong>Цена:</strong> ${rubFormatted} ₽ (${priceValue} $)</p>
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
