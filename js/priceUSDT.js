 // загрузка из kursBTC.txt
fetch('https://hamsauno.github.io/Miner/kursBTC.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n'); // Разбиваем текст на строки
        if (lines.length > 1) {
            const secondLine = lines[1].trim(); // Берем вторую строку
            console.log("Вторая строка:", secondLine);

            // Теперь можно использовать значение в логике
            // Например, сохранить в переменную:
            const priceUSDT = parseFloat(secondLine); // Преобразуем в число, если это курс
            console.log("Курс BTC:", priceUSDT);
        } else {
            console.error("В файле недостаточно строк.");
        }
    })
    .catch(error => console.error("Ошибка загрузки файла:", error));
    