// Значение по умолчанию
let priceUSDT = 0;

// Загрузка курса BTC из kursBTC.txt
fetch('https://hamsauno.github.io/Miner/kursBTC.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n'); // Разбиваем текст на строки
        if (lines.length > 1) {
            priceUSDT = parseFloat(lines[1].trim()); // Преобразуем в число
            console.log("Курс USDT:", priceUSDT);

            // Загружаем данные только если функция уже определена
            if (typeof loadData === 'function') {
                loadData();
            }

            // Если используешь и для предзаказа:
            if (typeof loadPreorderData === 'function') {
                loadPreorderData();
            }

        } else {
            console.error("В файле kursBTC.txt недостаточно строк.");
        }
    })
    .catch(error => console.error("Ошибка загрузки курса BTC:", error));
