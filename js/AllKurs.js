// Функция для получения данных с удалённого текстового файла
async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt";

    console.log("🔄 Начинаем загрузку курсов с:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("❌ Не удалось загрузить данные. Статус: " + response.status);
        }
        const data = await response.text();
        console.log("📄 Полученные данные:\n", data);

        const lines = data.trim().split("\n").map(line => line.trim());

        if (lines.length >= 6) {
            const btcPrice = parseFloat(lines[0]); // BTC
            const usdtPrice = parseFloat(lines[1]); // USDT
            const ltcPrice = parseFloat(lines[3]); // LTC
            const dogePrice = parseFloat(lines[4]); // DOGE
            const bellPrice = parseFloat(lines[5]); // BELL

            console.log("📈 Распарсенные значения:");
            console.log("BTC:", btcPrice);
            console.log("USDT:", usdtPrice);
            console.log("LTC:", ltcPrice);
            console.log("DOGE:", dogePrice);
            console.log("BELL:", bellPrice);

            if ([btcPrice, usdtPrice, ltcPrice, dogePrice, bellPrice].every(val => !isNaN(val))) {
                setTextValue("btcPrice", `$${btcPrice.toFixed(2)}`);
                setTextValue("usdtPrice", `₽${usdtPrice.toFixed(2)}`);
                setTextValue("ltcPrice", `$${ltcPrice.toFixed(2)}`);
                setTextValue("dogePrice", `$${dogePrice.toFixed(4)}`);
                setTextValue("bellPrice", `$${bellPrice.toFixed(4)}`);

                updateTime();
                console.log("✅ Курсы успешно обновлены");
            } else {
                console.error("❌ Ошибка: Данные содержат неверные значения.");
                setErrorPlaceholders();
            }
        } else {
            console.error("❌ Ошибка: недостаточно строк в файле.");
            setErrorPlaceholders();
        }
    } catch (error) {
        console.error("❌ Ошибка загрузки файла:", error);
        setErrorPlaceholders();
    }
}

// Устанавливает текст в элемент
function setTextValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    } else {
        console.error("⚠️ Элемент не найден:", id);
    }
}

// Устанавливает плейсхолдеры "Ошибка"
function setErrorPlaceholders() {
    const ids = ["btcPrice", "usdtPrice", "ltcPrice", "dogePrice", "bellPrice"];
    ids.forEach(id => setTextValue(id, "Ошибка"));
}

// Обновляет время последнего обновления
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const element = document.getElementById("updatedTime");
    if (element) {
        element.textContent = `Обновлено в ${timeString}`;
        console.log("🕒 Время обновления установлено:", timeString);
    }
}

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", fetchData);
