
    // Функция для расчёта доходности и прибыли
    function calculateProfit() {
        const btcPrice = parseFloat(document.getElementById("btcPrice").value);
        const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
        const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);

        if (isNaN(btcPrice) || isNaN(usdtPrice) || isNaN(profitPerTH)) {
            alert("Данные для расчета отсутствуют или некорректны.");
            return;
        }

        let a = parseFloat(document.getElementById("hashrate").textContent); // Получаем значение хешрейта
        let b = parseFloat(document.getElementById("power").textContent); // Получаем значение потребления
        let h = parseFloat(document.getElementById("electricityCost").value); // Электричество
        let c = parseFloat(document.getElementById("asicCost").value); // Стоимость оборудования

        console.log("Hashrate:", a);
        console.log("Power:", b);
    
        if (isNaN(a) || isNaN(b)) {
            alert("Хешрейт или потребление некорректны.");
            return;
        }

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

