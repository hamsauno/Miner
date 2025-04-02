// Функция для получения данных с удалённого текстового файла
async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt"; // Новый URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Не удалось загрузить данные.");
        }
        const data = await response.text();

        console.log("Содержимое файла:", data); // Логируем содержимое файла

        // Разбиваем данные на строки
        const lines = data.trim().split("\n").map(line => line.trim());

        // Проверяем, достаточно ли строк
        if (lines.length >= 6) {
            console.log("Разобранные строки:", lines);

            const btcPrice = parseFloat(lines[0]); // BTC
            const usdtPrice = parseFloat(lines[1]); // USDT
            const ltcPrice = parseFloat(lines[3]); // LTC
            const dogePrice = parseFloat(lines[4]); // DOGE
            const bellPrice = parseFloat(lines[5]); // BELL

            console.log("BTC:", btcPrice, "USDT:", usdtPrice, "LTC:", ltcPrice, "DOGE:", dogePrice, "BELL:", bellPrice);

            // Проверяем, что все значения - числа
            if ([btcPrice, usdtPrice, ltcPrice, dogePrice, bellPrice].every(val => !isNaN(val))) {
                // Обновляем текст в <span> вместо установки в поле ввода
                setTextValue("usdtPrice", usdtPrice.toFixed(2));
                setTextValue("btcPrice", btcPrice.toFixed(2));
                setTextValue("ltcPrice", ltcPrice.toFixed(2));
                setTextValue("dogePrice", dogePrice.toFixed(4));
                setTextValue("bellPrice", bellPrice.toFixed(4));
            } else {
                console.error("Ошибка: Данные содержат неверные значения.");
                setErrorPlaceholders();
            }
        } else {
            console.error("Ошибка: недостаточно строк в файле.");
            setErrorPlaceholders();
        }
    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        setErrorPlaceholders();
    }
}

// Устанавливает текст в элемент
function setTextValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    } else {
        console.error("Элемент не найден:", id);
    }
}

// Функция для установки плейсхолдера "Ошибка" в элементы
function setErrorPlaceholders() {
    ["usdtPrice", "btcPrice", "ltcPrice", "dogePrice", "bellPrice"].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = "Ошибка";
        } else {
            console.error("Элемент не найден:", id);
        }
    });
}

// Загружаем данные при загрузке страницы
window.onload = async function() {
    await fetchData();
};
