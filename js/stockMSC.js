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
    
        // Проверяем, что availability существует и является массивом
        if (Array.isArray(availability)) {
            availability.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("item");
    
                // Получаем значения для каждой модели
                const model = item["Модели"] || "Неизвестная модель";
                const hashRate = item["Хешрейт"] || "Неизвестный хешрейт";
                const price = item["Цена"] || "Неизвестная цена";
    
                // Добавляем элементы в контейнер
                const p = document.createElement("p");
                p.textContent = `${model} ${hashRate} ${price}`;
    
                div.appendChild(p);
                container.appendChild(div);
            });
        } else {
            console.error("Ошибка: 'Наличие' не является массивом.");
        }
    })
    .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
    });
