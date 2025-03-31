// Функция для получения данных с удалённого текстового файла
async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt"; // Новый URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Не удалось загрузить данные.");
        }
        const data = await response.text();

        // Разбиваем данные на строки
        const lines = data.trim().split("\n");

        // Проверяем, достаточно ли строк
        if (lines.length >= 8) {
            const btcPrice = parseFloat(lines[0].trim()); // BTC
            const usdtPrice = parseFloat(lines[1].trim()); // USDT
            const ltcPrice = parseFloat(lines[5].trim()); // LTC
            const dogePrice = parseFloat(lines[6].trim()); // DOGE
            const bellPrice = parseFloat(lines[7].trim()); // BELL

            // Проверяем, что все значения - числа
            if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(ltcPrice) && !isNaN(dogePrice) && !isNaN(bellPrice)) {
                document.getElementById("usdtPrice").value = usdtPrice.toFixed(2);
                document.getElementById("btcPrice").value = btcPrice.toFixed(2);
                document.getElementById("ltcPrice").value = ltcPrice.toFixed(2);
                document.getElementById("dogePrice").value = dogePrice.toFixed(4);
                document.getElementById("bellPrice").value = bellPrice.toFixed(4);
            } else {
                console.error("Ошибка: Данные из файла содержат неверные значения.");
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

// Функция для установки плейсхолдера "Ошибка" в поля
function setErrorPlaceholders() {
    document.getElementById("usdtPrice").value = "";
    document.getElementById("btcPrice").value = "";
    document.getElementById("ltcPrice").value = "";
    document.getElementById("dogePrice").value = "";
    document.getElementById("bellPrice").value = "";

    document.getElementById("usdtPrice").placeholder = "Ошибка";
    document.getElementById("btcPrice").placeholder = "Ошибка";
    document.getElementById("ltcPrice").placeholder = "Ошибка";
    document.getElementById("dogePrice").placeholder = "Ошибка";
    document.getElementById("bellPrice").placeholder = "Ошибка";
}

// Загружаем данные при загрузке страницы
window.onload = async function() {
    await fetchData();
};
