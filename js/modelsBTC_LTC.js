let jsonData = [];
let currentAlgorithm = "SHA-256";
let dailyIncome = 0;
let dailyProfitValue = 0;
let monthlyProfit = 0;
let yearlyProfit = 0;
let usdtPrice = 0;
let isUSD = true; // По умолчанию показываем доллары

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Загрузка страницы...");

    const algorithmSelect = document.getElementById("algorithmSelect");
    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const asicModel = document.getElementById("asicModel");
    const calcBtn = document.getElementById("calculateBtn");
    const toggleButton = document.getElementById('toggleCurrency');

    if (!algorithmSelect || !manufacturerSelect || !asicModel || !calcBtn || !toggleButton) {
        console.error("❌ Один из элементов не найден");
        return;
    }

    algorithmSelect.addEventListener("change", onAlgorithmChange);
    manufacturerSelect.addEventListener("change", updateModelList);
    asicModel.addEventListener("change", updateAsicSpecs);
    calcBtn.addEventListener("click", calculateProfit);
    toggleButton.addEventListener('click', updateValues);

    await fetchData();
    await onAlgorithmChange(); // начальная инициализация
});


async function fetchData() {
    try {
        const response = await fetch("https://hamsauno.github.io/Miner/kursBTC.txt");
        const data = (await response.text()).trim().split("\n");

        console.log("✅ Загруженные строки из kursBTC.txt:", data);

        if (data.length >= 9) {
            const values = {
                btcPrice: parseFloat(data[0]),
                usdtPrice: parseFloat(data[1]),
                profitPerTH: parseFloat(data[2]),
                ltcPrice: parseFloat(data[3]),
                dogePrice: parseFloat(data[4]),
                bellPrice: parseFloat(data[5]),
                profitPerLTC: parseFloat(data[6]),
                profitPerDOGE: parseFloat(data[7]),
                profitPerBELL: parseFloat(data[8]),
            };

            Object.entries(values).forEach(([id, val]) => {
                const el = document.getElementById(id);
                if (el && !isNaN(val)) {
                    el.value = val.toFixed(id.startsWith("profit") ? 8 : 2);
                    if (id === "usdtPrice") {
                        usdtPrice = val; // Обновляем глобальную переменную usdtPrice при загрузке
                    }
                } else {
                    console.warn(`⚠️ Не удалось установить значение для ${id}`, val);
                }
            });

            console.log("📥 Значения из TXT успешно загружены:", values);
        } else {
            console.warn("❗ Недостаточно строк в kursBTC.txt");
        }
    } catch (e) {
        console.error("❌ Ошибка загрузки kursBTC.txt:", e);
    }
}

async function onAlgorithmChange() {
    const algorithmSelect = document.getElementById("algorithmSelect");
    currentAlgorithm = algorithmSelect.value;
    await fetchJsonData();

    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const uniqueManufacturers = [...new Set(jsonData.map(item => item["Производитель"].toLowerCase()))];
    manufacturerSelect.innerHTML = "";

    uniqueManufacturers.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m.charAt(0).toUpperCase() + m.slice(1);
        manufacturerSelect.appendChild(opt);
    });

    if (uniqueManufacturers.length > 0) {
        manufacturerSelect.value = uniqueManufacturers[0];
        updateModelList(); // и модель подтягивается
    }
}

async function fetchJsonData() {
    try {
        const response = await fetch("https://hamsauno.github.io/Miner/json/calc.json");
        const data = await response.json();
        jsonData = data["Расчёты"].filter(item => item["Алгоритм"] === currentAlgorithm);
        console.log("Загруженные данные по", currentAlgorithm, jsonData);
    } catch (e) {
        console.error("Ошибка загрузки JSON:", e);
    }
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

    if (models.length > 0) {
        modelSelect.selectedIndex = 0;
        updateAsicSpecs();
    }
}

function updateAsicSpecs() {
    const modelData = document.getElementById("asicModel").value.split("|");
    const model = modelData[0];
    const hashrate = modelData[1];

    const item = jsonData.find(i => i["Модель"] === model && i["Хешрейт"] === hashrate);
    if (item) {
        document.getElementById("hashrate").textContent = item["Хешрейт"];
        document.getElementById("edprice").textContent = item["Ед. изм."];
        document.getElementById("power").textContent = Math.round(item["Потребление"]);
        const currentUsdtPrice = parseFloat(document.getElementById("usdtPrice").value);
        document.getElementById("asicCost").value = Math.ceil(item["Цена"] * currentUsdtPrice / 100) * 100;
    }
}

function calculateProfit() {
    const currentUsdtPrice = parseFloat(document.getElementById("usdtPrice").value);
    const hashrate = parseFloat(document.getElementById("hashrate").textContent);
    const power = parseFloat(document.getElementById("power").textContent);
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const asicCost = parseFloat(document.getElementById("asicCost").value);

    if ([hashrate, power, electricityCost, asicCost].some(isNaN))
        return alert("Некорректные данные");

    dailyIncome = 0;

    if (currentAlgorithm === "SHA-256") {
        const btcPrice = parseFloat(document.getElementById("btcPrice").value);
        const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);
        dailyIncome = hashrate * profitPerTH * btcPrice;
    } else if (currentAlgorithm === "Scrypt") {
        const ltcPrice = parseFloat(document.getElementById("ltcPrice").value);
        const dogePrice = parseFloat(document.getElementById("dogePrice").value);
        const bellPrice = parseFloat(document.getElementById("bellPrice").value);
        const profitPerLTC = parseFloat(document.getElementById("profitPerLTC").value);
        const profitPerDOGE = parseFloat(document.getElementById("profitPerDOGE").value);
        const profitPerBELL = parseFloat(document.getElementById("profitPerBELL").value);
        dailyIncome =
            (hashrate * profitPerLTC * ltcPrice) +
            (hashrate * profitPerDOGE * dogePrice) +
            (hashrate * profitPerBELL * bellPrice);
    }

    const dailyElectricityCostValue = ((power / 1000) * electricityCost * 24) / currentUsdtPrice;
    dailyProfitValue = dailyIncome - dailyElectricityCostValue;
    monthlyProfit = dailyProfitValue * 30.5;
    yearlyProfit = dailyProfitValue * 365;
    const roi = (yearlyProfit / (asicCost / currentUsdtPrice)) * 100;
    const payback = dailyProfitValue > 0 ? ((asicCost / currentUsdtPrice) / dailyProfitValue) / 30.5 : Infinity;

    document.getElementById("income").innerText           = "$" + dailyIncome.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("income_rub").innerText       = (dailyIncome * currentUsdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + " ₽";
    
    document.getElementById("profit").innerText           = "$" + dailyProfitValue.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("profit_rub").innerText       = (dailyProfitValue * currentUsdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + " ₽";
    
    document.getElementById("incomeMonth").innerText      = "$" + (dailyIncome * 30.5).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("incomeMonth_rub").innerText  = (dailyIncome * 30.5 * currentUsdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + " ₽";
    
    document.getElementById("incomeYear").innerText       = "$" + (dailyIncome * 365).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("incomeYear_rub").innerText   = (dailyIncome * 365 * currentUsdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + " ₽";
    
    document.getElementById("profitMonth").innerText      = "$" + monthlyProfit.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("profitMonth_rub").innerText  = (monthlyProfit * currentUsdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + " ₽";
    
    document.getElementById("profitYear").innerText       = "$" + yearlyProfit.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("profitYear_rub").innerText   = (yearlyProfit * currentUsdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + " ₽";

    document.getElementById("roi").innerText = roi.toFixed(2);
    document.getElementById("payback").innerText = isFinite(payback) ? payback.toFixed(0) : "∞";

    // Обновляем прогресс-бар
    const incomeBar = document.getElementById("dailyProfit");
    const electricityBar = document.getElementById("dailyElectricityCost");

    if (dailyIncome > 0) {
        const profitPercentage = (Math.max(0, dailyProfitValue) / dailyIncome) * 100;
        const electricityPercentage = (dailyElectricityCostValue / dailyIncome) * 100;

        incomeBar.style.width = `${profitPercentage}%`;
        incomeBar.style.backgroundColor = "green"; // Цвет прибыли

        electricityBar.style.width = `${electricityPercentage}%`;
        electricityBar.style.left = `${profitPercentage}%`;
        electricityBar.style.backgroundColor = "red"; // Цвет расходов
    } else {
        incomeBar.style.width = "0%";
        electricityBar.style.width = "0%";
    }
}

function updateValues() {
    const incomeUsd = document.getElementById("income");
    const incomeRub = document.getElementById("income_rub");
    const incomeMonthUsd = document.getElementById("incomeMonth");
    const incomeMonthRub = document.getElementById("incomeMonth_rub");
    const incomeYearUsd = document.getElementById("incomeYear");
    const incomeYearRub = document.getElementById("incomeYear_rub");
    const profitUsd = document.getElementById("profit");
    const profitRub = document.getElementById("profit_rub");
    const profitMonthUsd = document.getElementById("profitMonth");
    const profitMonthRub = document.getElementById("profitMonth_rub");
    const profitYearUsd = document.getElementById("profitYear");
    const profitYearRub = document.getElementById("profitYear_rub");
    const toggleButton = document.getElementById('toggleCurrency');

    if (isUSD) {
        // Показываем в рублях, скрываем доллары
        incomeUsd.classList.add("hidden");
        incomeRub.classList.remove("hidden");
        incomeMonthUsd.classList.add("hidden");
        incomeMonthRub.classList.remove("hidden");
        incomeYearUsd.classList.add("hidden");
        incomeYearRub.classList.remove("hidden");
        profitUsd.classList.add("hidden");
        profitRub.classList.remove("hidden");
        profitMonthUsd.classList.add("hidden");
        profitMonthRub.classList.remove("hidden");
        profitYearUsd.classList.add("hidden");
        profitYearRub.classList.remove("hidden");
        toggleButton.innerHTML = "&lt; ₽ &gt;";
    } else {
        // Показываем в долларах, скрываем рубли
        incomeUsd.classList.remove("hidden");
        incomeRub.classList.add("hidden");
        incomeMonthUsd.classList.remove("hidden");
        incomeMonthRub.classList.add("hidden");
        incomeYearUsd.classList.remove("hidden");
        incomeYearRub.classList.add("hidden");
        profitUsd.classList.remove("hidden");
        profitRub.classList.add("hidden");
        profitMonthUsd.classList.remove("hidden");
        profitMonthRub.classList.add("hidden");
        profitYearUsd.classList.remove("hidden");
        profitYearRub.classList.add("hidden");
        toggleButton.innerHTML = "&lt; $ &gt;";
    }
    isUSD = !isUSD; // Переключаем состояние
}
