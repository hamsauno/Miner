let priceUSDT = 0; // Глобальная переменная

// Загрузка курса BTC из kursBTC.txt
fetch('https://hamsauno.github.io/Miner/kursBTC.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n'); // Разбиваем текст на строки
        if (lines.length > 1) {
            priceUSDT = parseFloat(lines[1].trim()); // Преобразуем в число
            console.log("Курс USDT:", priceUSDT);

            // После получения курса загружаем данные из JSON
            loadData();
        } else {
            console.error("В файле kursBTC.txt недостаточно строк.");
        }
    })
    .catch(error => console.error("Ошибка загрузки курса BTC:", error));
