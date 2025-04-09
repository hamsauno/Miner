let jsonData = [];

    async function fetchData() {
      const url = "https://hamsauno.github.io/Miner/kursBTC.txt";
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки данных: ' + response.status);
        const data = await response.text();
        const lines = data.trim().split("\n");

        if (lines.length >= 3) {
          const btcPrice = parseFloat(lines[0]);
          const usdtPrice = parseFloat(lines[1]);
          const profitPerTH = parseFloat(lines[2]);

          if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(profitPerTH)) {
            document.getElementById("btcPrice").value = btcPrice.toFixed(2);
            document.getElementById("usdtPrice").value = usdtPrice.toFixed(2);
            document.getElementById("profitPerTH").value = profitPerTH.toFixed(8);
          } else {
            throw new Error("Данные не являются числами.");
          }
        } else {
          throw new Error("Недостаточно строк.");
        }
      } catch (error) {
        console.error("Ошибка:", error);
        document.getElementById("btcPrice").value = "Ошибка";
        document.getElementById("usdtPrice").value = "Ошибка";
        document.getElementById("profitPerTH").value = "Ошибка";
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

      if (isNaN(btcPrice) || isNaN(usdtPrice) || isNaN(profitPerTH)) {
        alert("Некорректные данные для расчета.");
        return;
      }

      const a = parseFloat(document.getElementById("hashrate").textContent);
      const b = parseFloat(document.getElementById("power").textContent);
      const h = parseFloat(document.getElementById("electricityCost").value);
      const c = parseFloat(document.getElementById("asicCost").value);

      if (isNaN(a) || isNaN(b) || isNaN(h) || isNaN(c)) {
        alert("Не все данные заполнены корректно.");
        return;
      }

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

    // Загружаем JSON и курс при запуске
    async function init() {
      await fetchData();
      const jsonUrl = "https://hamsauno.github.io/Miner/calc.json";
      const res = await fetch(jsonUrl);
      jsonData = await res.json();

      const manufacturers = [...new Set(jsonData.map(item => item["Производитель"].toLowerCase()))];
      const select = document.getElementById("manufacturerSelect");

      manufacturers.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        select.appendChild(opt);
      });
    }

    init();
