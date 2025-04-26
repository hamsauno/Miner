let jsonData = [];
  let currentAlgorithm = "SHA-256";
 
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("Загрузка страницы...");
 
    const algorithmSelect = document.getElementById("algorithmSelect");
    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const asicModel = document.getElementById("asicModel");
    const calcBtn = document.getElementById("calculateBtn");
 
    if (!algorithmSelect || !manufacturerSelect || !asicModel || !calcBtn) {
      console.error("❌ Один из элементов не найден");
      return;
    }
 
    algorithmSelect.addEventListener("change", onAlgorithmChange);
    manufacturerSelect.addEventListener("change", updateModelList);
    asicModel.addEventListener("change", updateAsicSpecs);
    calcBtn.addEventListener("click", calculateProfit);
 
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
 
    if ([hashrate, power, electricityCost, asicCost].some(isNaN))
      return alert("Некорректные данные");
 
    let dailyIncome = 0;
 
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
 
    const dailyElectricityCost = ((power / 1000) * electricityCost * 24) / usdtPrice;
    const dailyProfit = dailyIncome - dailyElectricityCost;
    const monthlyProfit = dailyProfit * 30.5;
    const yearlyProfit = dailyProfit * 365;
    const roi = (yearlyProfit / (asicCost / usdtPrice)) * 100;
    const payback = dailyProfit > 0 ? ((asicCost / usdtPrice) / dailyProfit) / 30.5 : Infinity;
 
    document.getElementById("income").innerText = dailyIncome.toFixed(2);
    document.getElementById("profit").innerText = dailyProfit.toFixed(2);
    document.getElementById("incomeMonth").innerText = (dailyIncome * 30.5).toFixed(2);
    document.getElementById("incomeYear").innerText = (dailyIncome * 365).toFixed(2);
    document.getElementById("profitMonth").innerText = monthlyProfit.toFixed(2);
    document.getElementById("profitYear").innerText = yearlyProfit.toFixed(2);
    document.getElementById("roi").innerText = roi.toFixed(2);
    document.getElementById("payback").innerText = payback.toFixed(0);
 document.getElementById("income").innerText = dailyIncome.toFixed(2);
 document.getElementById("income_rub").innerText = (dailyIncome * usdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
 
 document.getElementById("profit").innerText = dailyProfit.toFixed(2);
 document.getElementById("profit_rub").innerText = (dailyProfit * usdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
 
 document.getElementById("incomeMonth").innerText = (dailyIncome * 30.5).toFixed(2);
 document.getElementById("incomeMonth_rub").innerText = (dailyIncome * 30.5 * usdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
 
 document.getElementById("incomeYear").innerText = (dailyIncome * 365).toFixed(2);
 document.getElementById("incomeYear_rub").innerText = (dailyIncome * 365 * usdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
 
 document.getElementById("profitMonth").innerText = monthlyProfit.toFixed(2);
 document.getElementById("profitMonth_rub").innerText = (monthlyProfit * usdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
 
 document.getElementById("profitYear").innerText = yearlyProfit.toFixed(2);
 document.getElementById("profitYear_rub").innerText = (yearlyProfit * usdtPrice).toLocaleString('ru-RU', { maximumFractionDigits: 0 });
 
 document.getElementById("roi").innerText = roi.toFixed(2);
 document.getElementById("roi_rub").innerText = roi.toFixed(2);
 
 document.getElementById("payback").innerText = payback.toFixed(0);
 document.getElementById("payback_rub").innerText = payback.toFixed(0);
 
  }
