
// Функция для получения данных с удалённого текстового файла
    async function fetchData() {
        const url = "https://hamsauno.github.io/Miner/kursBTC.txt"; // Новый URL

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные.');
            }
            const data = await response.text();
            
            // Разбиваем данные на строки
            const lines = data.trim().split("\n");
            
            // Убедимся, что строк достаточно для всех данных
            if (lines.length >= 3) {
                const btcPrice = parseFloat(lines[0].trim());
                const usdtPrice = parseFloat(lines[1].trim());
                const profitPerTH = parseFloat(lines[2].trim());

                if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(profitPerTH)) {
                    document.getElementById("btcPrice").value = btcPrice.toFixed(2);
                    document.getElementById("usdtPrice").value = usdtPrice.toFixed(2);
                    document.getElementById("profitPerTH").value = profitPerTH.toFixed(8);
                } else {
                    console.error("Ошибка: Данные из файла не являются валидными числами.");
                    document.getElementById("btcPrice").value = "Ошибка";
                    document.getElementById("usdtPrice").value = "Ошибка";
                    document.getElementById("profitPerTH").value = "Ошибка";
                }
            } else {
                console.error("Ошибка: недостаточно строк в файле.");
            }
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
            document.getElementById("btcPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("usdtPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("profitPerTH").value = "Ошибка при загрузке данных.";
        }
    }
    // Загружаем данные и обновляем элементы
    window.onload = async function() {
        await fetchData(); // Загружаем данные из файла kursBTC.txt
    }
    // Функция для расчёта доходности и прибыли
    function calculateProfit() {
        const btcPrice = parseFloat(document.getElementById("btcPrice").value);
        const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
        const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);

        if (isNaN(btcPrice) || isNaN(usdtPrice) || isNaN(profitPerTH)) {
            alert("Данные для расчета отсутствуют или некорректны.");
            return;
        }

        let a = parseFloat(document.getElementById("hashrate").value);
        let b = parseFloat(document.getElementById("power").value);
        let h = parseFloat(document.getElementById("electricityCost").value);
        let c = parseFloat(document.getElementById("asicCost").value);

        let dailyIncome = a * profitPerTH * btcPrice;
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

