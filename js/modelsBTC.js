let jsonData = [];

window.onload = async function () {
    await fetchData();
    await fetchJsonData();
    populateManufacturers();
    updateModelList();

    document.getElementById("manufacturerSelect").addEventListener("change", updateModelList);
    document.getElementById("asicModel").addEventListener("change", updateAsicSpecs);
    document.getElementById("calculateBtn").addEventListener("click", calculateProfit);
};

async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt";

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
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки JSON: " + response.status);
        const data = await response.json();
        jsonData = data["Расчёты"].filter(item => item["Алгоритм"] === "SHA-256");
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
        opt.textContent = `${item["Модель"]} (${item["Хешрейт"]} TH)`;
        modelSelect.appendChild(opt);
    });

    if (modelSelect.value) updateAsicSpecs();
}

function updateAsicSpecs() {
    const [model, hashrate] = document.getElementById("asicModel").value.split("|");
    const item = jsonData.find(i => i["Модель"] === model && i["Хешрейт"] === hashrate);
    if (item) {
        document.getElementById("hashrate").textContent = item["Хешрейт"];
        document.getElementById("power").textContent = item["Потребление"];
        document.getElementById("asicCost").value = item["Цена"];
    }
}

function calculateProfit() {
    const btcPrice = parseFloat(document.getElementById("btcPrice").value);
    const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
    const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);
    if (isNaN(btcPrice) || isNaN(usdtPrice) || isNaN(profitPerTH)) return alert("Некорректные данные");

    const a = parseFloat(document.getElementById("hashrate").textContent);
    const b = parseFloat(document.getElementById("power").textContent);
    const h = parseFloat(document.getElementById("electricityCost").value);
    const c = parseFloat(document.getElementById("asicCost").value);
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

    document.getElementById("income").innerText = dailyIncome.toFixed(2);
    document.getElementById("profit").innerText = dailyProfit.toFixed(2);
    document.getElementById("incomeMonth").innerText = monthlyIncome.toFixed(2);
    document.getElementById("incomeYear").innerText = yearlyIncome.toFixed(2);
    document.getElementById("profitMonth").innerText = monthlyProfit.toFixed(2);
    document.getElementById("profitYear").innerText = yearlyProfit.toFixed(2);
    document.getElementById("roi").innerText = roi.toFixed(2);
    document.getElementById("payback").innerText = payback.toFixed(0);
}
