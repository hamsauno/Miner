fetch('https://hamsauno.github.io/Miner/json/data.json')
    .then(response => response.json())
    .then(data => {
        // Проверяем данные
        console.log(data);
        
        // Проверяем, что данные существуют
        if (data && data["Наличие"]) {
            const availability = data["Наличие"];  // Данные из секции "Наличие"
            const container = document.getElementById("container");
            
            if (!container) {
                console.error("Контейнер с id 'container' не найден");
                return;
            }

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
        } else {
            console.error("Данные для 'Наличие' не найдены в JSON");
        }
    })
    .catch(error => {
       
