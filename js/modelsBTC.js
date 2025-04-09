let jsonData = [];

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Загрузка страницы...");

    await fetchData();
    await fetchJsonData();
    populateManufacturers();
    updateModelList();

    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const asicModel = document.getElementById("asicModel");
    const calcBtn = document.getElementById("calculateBtn");

    if (manufacturerSelect) {
        manufacturerSelect.addEventListener("change", updateModelList);
        console.log("Добавлен обработчик события для выбора производителя");
    }
    if (asicModel) {
        asicModel.addEventListener("change", updateAsicSpecs);
        console.log("Добавлен обработчик события для выбора модели ASIC");
    }
    if (calcBtn) {
        calcBtn.addEventListener("click", calculateProfit);
        console.log("Добавлен обработчик события для расчёта прибыли");
    }
});

async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt";
    console.log("Загрузка данных о курсе BTC...");

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки курса');
        const data = await response.text();
        const lines = data.trim().split("\n");
        if (lines.length >= 3) {
            const btcPrice = parseFloat(lines[0].trim());
            const usdtPrice = parseFloat(lines[1].trim());
            const profitPerTH = parseFloat(lines[2].trim());

            if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(profitPerTH)) {
                console.log("Курс BTC:", btcPrice);
                console.log("Курс USDT:", usdtPrice);
                console.log("Доходность за TH:", profitPerTH);

                document.getElementById("btcPrice").value = btcPrice.toFixed(2);
                document.getElementById("usdtPrice").value = usdtPrice.toFixed(2);
                document.getElementById("profitPerTH").value = profitPerTH.toFixed(8);
            }
        }
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        document.getElementById("btcPrice").value = "Ошибка";
        document.getElementById("usdtPrice").value = "Ошибка";
        document.getElementById("profitPerTH").value = "Ошибка";
    }
}

async function fetchJsonData() {
    const url = "https://hamsauno.github.io/Miner/json/calc.json";
    console.log("Загрузка данных JSON...");

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки JSON: " + response.status);
        const data = await response.json();
        jsonData = data["Расчёты"].filter(item => item["Алгоритм"] === "SHA-256");

        console.log("Загружены данные JSON:", jsonData);
    } catch (err) {
        console.error("Ошибка JSON:", err);
    }
}

function populateManufacturers() {
    console.log("Заполнение списка производителей...");
    
    const select = document.getElementById("manufacturerSelect");
    const manufacturers = [...new Set(jsonData.map(item => item["Производитель"].toLowerCase()))];
    select.innerHTML = "";
    manufacturers.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m.charAt(0).toUpperCase() + m.slice(1);
        select.appendChild(opt);
    });

    console.log("Производители:", manufacturers);
}

function updateModelList() {
    console.log("Обновление списка моделей...");

    const manufacturer = document.getElementById("manufacturerSelect").value;
    const modelSelect = document.getElementById("asicModel");
    modelSelect.innerHTML = "";

    const models = jsonData.filter(item => item["Производитель"].toLowerCase() === manufacturer);
    console.log("Модели для производителя", manufacturer, ":", models);

    models.forEach(item => {
        const opt = document.createElement("option");
        opt.value = `${item["Модель"]}|${item["Хешрейт"]}`;
        opt.textContent = `${item["Модель"]} (${item["Хешрейт"]} TH)`;
        modelSelect.appendChild(opt);
    });

    if (modelSelect.value) updateAsicSpecs();
}

function updateAsicSpecs() {
    console.log("Обновление характеристик ASIC...");

    const [model, hashrate] = document.getElementById("asicModel").value.split("|");
    console.log("Выбрана модель:", model, "с хешрейтом:", hashrate);

    const item = jsonData.find(i => i["Модель"] === model && i["Хешрейт"] === hashrate);
    if (item) {
        console.log("Характеристики модели:", item);

        document.getElementById("hashrate").textContent = item["Хешрейт"];
        document.getElementById("power").textContent = item["Потребление"];
        document.getElementById("asicCost").value = Math.ceil(item["Цена"] * parseFloat(document.getElementById("usdtPrice").value) / 100) * 100;
    }
}

function calculateProfit() {
    console.log("Расчёт прибыли...");

    const btcPrice = parseFloat(document.getElementById("btcPrice").value);
    const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
    const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);

    console.log("Курс BTC:", btcPrice);
    console.log("Курс USDT:", usdtPrice);
    console.log("Доходность за TH:", profitPerTH);

    if (isNaN(btcPrice) || isNaN(usdtPrice) || isNaN(profitPerTH)) return alert("Некорректные данные");

    const a = parseFloat(document.getElementById("hashrate").textContent);
    const b = parseFloat(document.getElementById("power").textContent);
    const h = parseFloat(document.getElementById("electricityCost").value);
    const c = parseFloat(document.getElementById("asicCost").value);

    console.log("Хешрейт:", a, "Потребление:", b, "Стоимость электроэнергии:", h, "Стоимость оборудования:", c);

    if (isNaN(a) || isNaN(b) || isNaN(h) || isNaN(c)) return alert("Проверьте значения");

    const dailyIncome = a * profitPerTH * btcPrice;
    const monthlyIncome = dailyIncome * 30.5;
    const yearlyIncome = dailyIncome * 365;

    const dailyElectricityCost = ((b / 1000) * h * 24) / usdtPrice;
    const dailyProfit = dailyIncome - dailyElectricityCost;
    const monthlyProfit = dailyProfit * 30.5;
    const yearlyProfit = dailyProfit * 365;
    const roi = (dailyProfit * 365 / (c / usdtPrice)) * 100;
    const payback = ((c / usdtPrice) / dailyProfit) / 30.5;

    console.log("Ежедневный доход:", dailyIncome.toFixed(2));
    console.log("Ежедневная прибыль:", dailyProfit.toFixed(2));

    document.getElementById("income").innerText = dailyIncome.toFixed(2);
    document.getElementById("profit").innerText = dailyProfit.toFixed(2);
    document.getElementById("incomeMonth").innerText = monthlyIncome.toFixed(2);
    document.getElementById("incomeYear").innerText = yearlyIncome.toFixed(2);
    document.getElementById("profitMonth").innerText = monthlyProfit.toFixed(2);
    document.getElementById("profitYear").innerText = yearlyProfit.toFixed(2);
    document.getElementById("roi").innerText = roi.toFixed(2);
    document.getElementById("payback").innerText = payback.toFixed(0);
}
