document.addEventListener("DOMContentLoaded", function () {
  const algorithmSelect = document.getElementById("algorithmSelect");
  const manufacturerSelect = document.getElementById("manufacturerSelect");
  const modelSelect = document.getElementById("modelSelect");

  algorithmSelect.addEventListener("change", () => {
    updateManufacturers(algorithmSelect.value);
  });

  manufacturerSelect.addEventListener("change", () => {
    updateModels(algorithmSelect.value, manufacturerSelect.value);
  });

  modelSelect.addEventListener("change", () => {
    updateModelData(algorithmSelect.value, manufacturerSelect.value, modelSelect.value);
  });

  fetch("https://hamsauno.github.io/Miner/calc.json")
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
      updateManufacturers(algorithmSelect.value);
    });

  fetchData();
});

let jsonData;
let currentAlgorithm = "";

function updateManufacturers(algorithm) {
  currentAlgorithm = algorithm;
  const manufacturerSelect = document.getElementById("manufacturerSelect");
  const manufacturers = new Set();

  jsonData["Расчёты"].forEach((item) => {
    if (item["Алгоритм"] === algorithm) {
      manufacturers.add(item["Производитель"]);
    }
  });

  manufacturerSelect.innerHTML = [...manufacturers]
    .map((manufacturer) => `<option value="${manufacturer}">${manufacturer}</option>`)
    .join("");

  if (manufacturers.size > 0) {
    updateModels(algorithm, manufacturerSelect.value);
  } else {
    document.getElementById("modelSelect").innerHTML = "";
  }
}

function updateModels(algorithm, manufacturer) {
  const modelSelect = document.getElementById("modelSelect");
  const models = jsonData["Расчёты"]
    .filter((item) => item["Алгоритм"] === algorithm && item["Производитель"] === manufacturer)
    .map((item) => item["Модель"]);

  modelSelect.innerHTML = models
    .map((model) => `<option value="${model}">${model}</option>`)
    .join("");

  if (models.length > 0) {
    updateModelData(algorithm, manufacturer, models[0]);
  }
}

function updateModelData(algorithm, manufacturer, model) {
  const selected = jsonData["Расчёты"].find(
    (item) =>
      item["Алгоритм"] === algorithm &&
      item["Производитель"] === manufacturer &&
      item["Модель"] === model
  );

  if (selected) {
    document.getElementById("hashrate").textContent = selected["Хешрейт"];
    document.getElementById("unit").textContent = selected["Ед. изм."];
    document.getElementById("power").textContent = selected["Потребление"];
    document.getElementById("asicCost").value = selected["Цена"];
    calculateProfit();
  }
}

function calculateProfit() {
  const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
  const hashrate = parseFloat(document.getElementById("hashrate").textContent);
  const power = parseFloat(document.getElementById("power").textContent);
  const electricityCost = parseFloat(document.getElementById("electricityCost").value);
  const asicCost = parseFloat(document.getElementById("asicCost").value);

  if ([hashrate, power, electricityCost, asicCost].some(isNaN)) {
    alert("Некорректные данные для расчёта");
    return;
  }

  let dailyIncome = 0;

  if (currentAlgorithm === "SHA-256") {
    const btcPrice = parseFloat(document.getElementById("btcPrice").value);
    const profitPerTH = parseFloat(document.getElementById("profitPerTH").value);

    console.log("🔢 SHA-256 расчёт:");
    console.log("Hashrate:", hashrate);
    console.log("Profit/TH:", profitPerTH);
    console.log("BTC Price:", btcPrice);

    if (!isNaN(hashrate) && !isNaN(profitPerTH) && !isNaN(btcPrice)) {
      dailyIncome = hashrate * profitPerTH * btcPrice;
    } else {
      console.warn("⚠️ Пропущены данные SHA-256 для расчёта");
      return;
    }
  } else if (currentAlgorithm === "Scrypt") {
    const ltcPrice = parseFloat(document.getElementById("ltcPrice").value);
    const dogePrice = parseFloat(document.getElementById("dogePrice").value);
    const bellPrice = parseFloat(document.getElementById("bellPrice").value);
    const profitPerLTC = parseFloat(document.getElementById("profitPerLTC").value);
    const profitPerDOGE = parseFloat(document.getElementById("profitPerDOGE").value);
    const profitPerBELL = parseFloat(document.getElementById("profitPerBELL").value);

    console.log("🔢 Scrypt расчёт:");
    dailyIncome =
      (hashrate * profitPerLTC * ltcPrice) +
      (hashrate * profitPerDOGE * dogePrice) +
      (hashrate * profitPerBELL * bellPrice);
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
