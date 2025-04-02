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

        let a = parseFloat(document.getElementById("hashrate").textContent); // Получаем значение хешрейта
        let b = parseFloat(document.getElementById("power").textContent); // Получаем значение потребления
        let h = parseFloat(document.getElementById("electricityCost").value); // Электричество
        let c = parseFloat(document.getElementById("asicCost").value); // Стоимость оборудования

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
