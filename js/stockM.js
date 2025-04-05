  
   // Функция загрузки данных из data.json
function loadData() {
    fetch('https://hamsauno.github.io/Miner/json/data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

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

                    // Проверяем, что price - число
                    const priceValue = parseFloat(price) || 0;
                    const rubPrice = priceValue * priceUSDT;

                    div.innerHTML = `
                        <p>${model} ${hashRate} - ${rubPrice} ₽ | ${priceValue} $</p>
                    `;

                    container.appendChild(div);
                });
            } else {
                console.error("Данные для 'Наличие' не найдены в JSON");
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
        });
}
