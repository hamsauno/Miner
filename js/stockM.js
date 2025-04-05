
   // Функция загрузки данных из data.json
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

                    const model = item["Модели"] || "Неизвестная модель";
                    const hashRate = item["Хешрейт"] || "Неизвестный хешрейт";
                    const price = item["Цена"] || "Неизвестная цена";

                    const priceValue = parseFloat(price) || 0;
                    let rubPrice = priceValue * priceUSDT;

                    const rubRounded = Math.ceil(rubPrice / 100) * 100;
                    const rubFormatted = rubRounded.toLocaleString('ru-RU').replace(/,/g, ' ');

                    div.innerHTML = `
                        <p>${model} ${hashRate} — ${rubFormatted} ₽ | ${priceValue} $</p>
                    `;

                    container.appendChild(div);
                });
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
        });
}
