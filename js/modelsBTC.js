let jsonData = [];
let currentAlgorithm = "SHA-256";

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Загрузка страницы...");

    await fetchData();
    await fetchJsonData();

    const algorithmSelect = document.getElementById("algorithmSelect");
    algorithmSelect.addEventListener("change", async () => {
        currentAlgorithm = algorithmSelect.value;
        await fetchJsonData();
        populateManufacturers();
        updateModelList();
    });

    populateManufacturers();
    updateModelList();

    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const asicModel = document.getElementById("asicModel");
    const calcBtn = document.getElementById("calculateBtn");

    if (manufacturerSelect) {
        manufacturerSelect.addEventListener("change", updateModelList);
    }
    if (asicModel) {
        asicModel.addEventListener("change", updateAsicSpecs);
    }
    if (calcBtn) {
        calcBtn.addEventListener("click", calculateProfit);
    }
});

async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки курса');
        const data = await response.text();
        const lines = data.trim().split("\n");

        if (lines.length >= 9) {
            document.getElementById("btcPrice").value = parseFloat(lines[0]).toFixed(2);
            document.getElementById("usdtPrice").value = parseFloat(lines[1]).toFixed(2);
            document.getElementById("profitPerTH").value = parseFloat(lines[2]).toFixed(8);
            document.getElementById("ltcPrice").value = parseFloat(lines[3]).toFixed(2);
            document.getElementById("dogePrice").value = parseFloat(lines[4]).toFixed(4);
            document.getElementById("bellPrice").value = parseFloat(lines[5]).toFixed(4);
            document.getElementById("profitPerLTC").value = parseFloat(lines[6]).toFixed(8);
            document.getElementById("profitPerDOGE").value = parseFloat(lines[7]).toFixed(8);
            document.getElementById("profitPerBELL").value = parseFloat(lines[8]).toFixed(8);
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

async function fetchJsonData() {
    const url = "https://hamsauno.github.io/Miner/json/calc.json";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки JSON: " + response.status);
        const data = await response.json();
        jsonData = data["Расчёты"].filter(item => item["Алгоритм"] === currentAlgorithm);
    } catch (err) {
        console.error("Ошибка JSON:", err);
    }
}

function populateManufacturers() {
    const select = document.getElementById("manufacturerSelect");
    const manufacturers = [...new Set(jsonData.map(item => item["Производитель"].toLowerCase()))];
    select.innerHTML = "";
    manufacturers.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m.charAt(0).toUpperCase() + m.slice(1);
        select.appendChild(opt);
    });
}

function updateModelList() {
    const manufacturer = document.getElementById("manufacturerSelect").value;
    const modelSelect = document.getElementById("asicModel");
    modelSelect.innerHTML = "";

    const models = jsonData.filter(item => item["Производитель"].toLowerCase() === manufacturer);
    models.forEach(item => {
        const opt = document.createElement("option");
        opt.value = `${item["Модель"]}|${item["Хешрейт"]}`;
        opt.textContent = `${item["Модель"]} (${item["Хешрейт"]} ${item["Ед. изм."]})`;
        modelSelect.appendChild(opt);
    });

    if (modelSelect.value) updateAsicSpecs();
}

function updateAsicSpecs() {
    const [model, hashrate] = document.getElementById("asicModel").value.split("|");
    const item = jsonData.find(i => i["Модель"] === model && i["Хешрейт"] === hashrate);
    if (item) {
        document.getElementById("hashrate").textContent = item["Хешрейт"];
        document.getElementById("edprice").textContent = item["Ед. изм."];
        document.getElementById("power").textContent = Math.round(item["Потребление"]);
        const usdt = parseFloat(document.getElementById("usdtPrice").value);
        document.getElementById("asicCost").value = Math.ceil(item["Цена"] * usdt / 100) * 100;
    }
}

function calculateProfit() {
    const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
    const hashrate = parseFloat(document.getElementById("hashrate").textContent);
    const power = parseFloat(document.getElementById("power").textContent);
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const asicCost = parseFloat(document.getElementById("asicCost").value);

    if (isNaN(hashrate) || isNaN(power) || isNaN(electricityCost) || isNaN(asicCost)) return alert("Некорректные данные");

    let dailyIncome = 0;

    if (currentAlgorithm === "SHA-256") {
        const btcPrice = parseFloat(document.getElementById("btcPrice").value);
        const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);
        dailyIncome = hashrate * profitPerTH * btcPrice;
    } else if (currentAlgorithm === "Scrypt") {
        const profitPerLTC = parseFloat(document.getElementById("profitPerLTC").value);
        const ltcPrice = parseFloat(document.getElementById("ltcPrice").value);
        dailyIncome = hashrate * profitPerLTC * ltcPrice;
    }

    const dailyElectricityCost = ((power / 1000) * electricityCost * 24) / usdtPrice;
    const dailyProfit = dailyIncome - dailyElectricityCost;
    const monthlyProfit = dailyProfit * 30.5;
    const yearlyProfit = dailyProfit * 365;
    const roi = (yearlyProfit / (asicCost / usdtPrice)) * 100;
    const payback = ((asicCost / usdtPrice) / dailyProfit) / 30.5;

    document.getElementById("income").innerText = dailyIncome.toFixed(2);
    document.getElementById("profit").innerText = dailyProfit.toFixed(2);
    document.getElementById("incomeMonth").innerText = (dailyIncome * 30.5).toFixed(2);
    document.getElementById("incomeYear").innerText = (dailyIncome * 365).toFixed(2);
    document.getElementById("profitMonth").innerText = monthlyProfit.toFixed(2);
    document.getElementById("profitYear").innerText = yearlyProfit.toFixed(2);
    document.getElementById("roi").innerText = roi.toFixed(2);
    document.getElementById("payback").innerText = payback.toFixed(0);
}
