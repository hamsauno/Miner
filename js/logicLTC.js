// Функция для получения данных с удалённого текстового файла
async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt"; 

    try {
        const response = await fetch(url);
        console.log("Ответ от сервера:", response);

        if (!response.ok) {
            throw new Error('Не удалось загрузить данные. Статус: ' + response.status);
        }

        const data = await response.text();
        console.log("Полученные данные:", data);

        if (!data || data.trim().length === 0) {
            throw new Error('Загруженные данные пусты.');
        }

        // Разделяем данные на строки и убираем лишние пробелы
        let lines = data.trim().split("\n").map(line => line.trim());
        console.log("Обработанные строки:", lines);

        // Проверяем, что данных достаточно
        if (lines.length < 9) {
            throw new Error(`Ошибка: недостаточно строк в файле (ожидалось 9, получено ${lines.length})`);
        }

        // Функция парсинга чисел с заменой запятой на точку
        const parseValue = (str) => parseFloat(str.replace(",", "."));

        const ltcPrice = parseValue(lines[3]);
        const dogePrice = parseValue(lines[4]);
        const bellPrice = parseValue(lines[5]);
        const usdtPrice = parseValue(lines[1]);
        const profitPerLTC = parseValue(lines[6]);
        const profitPerDOGE = parseValue(lines[7]);
	const profitPerBELL = parseValue(lines[8]);
       

        console.log("ltcPrice:", ltcPrice);
        console.log("dogePrice:", dogePrice);
        console.log("bellPrice:", bellPrice);
        console.log("usdtPrice:", usdtPrice);
        console.log("profitPerLTC:", profitPerLTC);
        console.log("profitPerDOGE:", profitPerDOGE);
        console.log("profitPerBELL:", profitPerBELL);

        // Проверяем корректность данных
        if ([ltcPrice, dogePrice, bellPrice, usdtPrice, profitPerLTC, profitPerDOGE, profitPerBELL].some(isNaN)) {
            throw new Error("Некоторые значения в файле не являются числами.");
        }

        // Заполняем скрытые поля
        document.getElementById("ltcPrice").value = ltcPrice.toFixed(2);
        document.getElementById("dogePrice").value = dogePrice.toFixed(4);
        document.getElementById("bellPrice").value = bellPrice.toFixed(4);
        document.getElementById("usdtPrice").value = usdtPrice.toFixed(8);
        document.getElementById("profitPerLTC").value = profitPerLTC.toFixed(8);
        document.getElementById("profitPerDOGE").value = profitPerDOGE.toFixed(8);
        document.getElementById("profitPerBELL").value = profitPerBELL.toFixed(8);

    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        alert("Ошибка загрузки данных. Проверьте доступность файла.");
    }
}

// Запускаем загрузку данных при открытии страницы
window.onload = async function() {
    await fetchData();
};



    // Функция для расчёта доходности и прибыли
    function calculateProfit() {
        const ltcPrice = parseFloat(document.getElementById("ltcPrice").value);
        const dogePrice = parseFloat(document.getElementById("dogePrice").value);
        const bellPrice = parseFloat(document.getElementById("bellPrice").value);
        const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
        const profitPerLTC = parseFloat(document.getElementById("profitPerLTC").value);
        const profitPerDOGE = parseFloat(document.getElementById("profitPerDOGE").value);
        const profitPerBELL = parseFloat(document.getElementById("profitPerBELL").value);

        // Логируем полученные значения
        console.log("ltcPrice:", ltcPrice);
        console.log("dogePrice:", dogePrice);
        console.log("bellPrice:", bellPrice);
        console.log("usdtPrice:", usdtPrice);
        console.log("profitPerLTC:", profitPerLTC);
        console.log("profitPerDOGE:", profitPerDOGE);
        console.log("profitPerBELL:", profitPerBELL);

        if (isNaN(ltcPrice) || isNaN(dogePrice) || isNaN(bellPrice) || isNaN(usdtPrice) || isNaN(profitPerLTC) || isNaN(profitPerDOGE) || isNaN(profitPerBELL)) {
            alert("Данные для расчета отсутствуют или некорректны.");
            return;
        }

        let a = parseFloat(document.getElementById("hashrate").value);
        let b = parseFloat(document.getElementById("power").value);
        let h = parseFloat(document.getElementById("electricityCost").value);
        let c = parseFloat(document.getElementById("asicCost").value);

        let dailyIncome = (a * profitPerLTC * ltcPrice) + (a * profitPerDOGE * dogePrice) + (a * profitPerBELL * bellPrice);
        let monthlyIncome = dailyIncome * 30.5;
        let yearlyIncome = dailyIncome * 365;

        let dailyElectricityCost = ((b / 1000) * h * 24) / usdtPrice;
        let dailyProfit = dailyIncome - dailyElectricityCost;
        let monthlyProfit = dailyProfit * 30.5;
        let yearlyProfit = dailyProfit * 365;
        let roi = (dailyProfit * 365 / (c / usdtPrice)) * 100;
        let payback = ((c / usdtPrice) / dailyProfit) / 30.5;

        document.getElementById("income").innerText = dailyIncome.toFixed(2);
        document.getElementById("profit").innerText = dailyProfit.toFixed(2);
        document.getElementById("incomeMonth").innerText = monthlyIncome.toFixed(2);
        document.getElementById("incomeYear").innerText = yearlyIncome.toFixed(2);
        document.getElementById("profitMonth").innerText = monthlyProfit.toFixed(2);
        document.getElementById("profitYear").innerText = yearlyProfit.toFixed(2);
        document.getElementById("roi").innerText = roi.toFixed(2);
        document.getElementById("payback").innerText = payback.toFixed(0);
    }
