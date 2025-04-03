        // Загрузка данных из JSON
        fetch('https://hamsauno.github.io/Miner/json/data.json')
            .then(response => response.json())
            .then(data => {
                // Проверяем данные
                console.log(data);
        
                const availability = data["Наличие"];  // Данные из секции "Наличие"
                const container = document.getElementById("container");
        
                // Очищаем контейнер перед добавлением данных
                container.innerHTML = '';
        
                availability.forEach(item => {
                    const div = document.createElement("div");
                    div.classList.add("item");
        
                    // Получаем значения для каждой модели
                    const model = item["Модели"] || "Неизвестная модель";
                    const hashRate = item["Хешрейт"] || "Неизвестный хешрейт";
                    const price = item["Цена"] || "Неизвестная цена";
        
                    // Добавляем элементы в контейнер
                    div.innerHTML = `
                            <p>${model} | ${hashRate} | ${price}</p>
                     `;
        
                    container.appendChild(div);
                });
            })
            .catch(error => {
                console.error("Ошибка при загрузке данных:", error);
            });
