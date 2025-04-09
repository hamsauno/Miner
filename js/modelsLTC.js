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

        // Функция для получения данных с удалённого текстового файла
        async function fetchData() {
            const url = "https://hamsauno.github.io/Miner/kursBTC.txt";
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Ошибка загрузки курса');
                const data = await response.text();
                const lines = data.trim().split("\n");
                if (lines.length >= 9) {
                    const ltcPrice = parseFloat(lines[3].trim());
                    const dogePrice = parseFloat(lines[4].trim());
                    const bellPrice = parseFloat(lines[5].trim());
                    const usdtPrice = parseFloat(lines[1].trim());
                    const profitPerLTC = parseFloat(lines[6].trim());
                    const profitPerDOGE = parseFloat(lines[7].trim());
                    const profitPerBELL = parseFloat(lines[8].trim());

                    console.log("ltcPrice:", ltcPrice, "dogePrice:", dogePrice, "bellPrice:", bellPrice);

                    document.getElementById("ltcPrice").value = ltcPrice.toFixed(2);
                    document.getElementById("dogePrice").value = dogePrice.toFixed(4);
                    document.getElementById("bellPrice").value = bellPrice.toFixed(4);
                    document.getElementById("usdtPrice").value = usdtPrice.toFixed(8);
                    document.getElementById("profitPerLTC").value = profitPerLTC.toFixed(8);
                    document.getElementById("profitPerDOGE").value = profitPerDOGE.toFixed(8);
                    document.getElementById("profitPerBELL").value = profitPerBELL.toFixed(8);
                }
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        }

        // Функция для загрузки JSON данных
        async function fetchJsonData() {
            const url = "https://hamsauno.github.io/Miner/json/calc.json";
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Ошибка загрузки JSON: " + response.status);
                const data = await response.json();
                jsonData = data["Расчёты"].filter(item => item["Алгоритм"] === "SHA-256" || item["Алгоритм"] === "Scrypt");
            } catch (err) {
                console.error("Ошибка JSON:", err);
            }
        }

        // Заполнение списка производителей
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

        // Обновление списка моделей в зависимости от производителя
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

        // Обновление характеристик ASIC
        function updateAsicSpecs() {
            const [model, hashrate] = document.getElementById("asicModel").value.split("|");
            const item = jsonData.find(i => i["Модель"] === model && i["Хешрейт"] === hashrate);
            if (item) {
                document.getElementById("hashrate").textContent = item["Хешрейт"];
                document.getElementById("power").textContent = Math.round(item["Потребление"]);
                document.getElementById("asicCost").value = Math.ceil(item["Цена"] * parseFloat(document.getElementById("usdtPrice").value) / 100) * 100;
            }
        }

        // Функция для расчёта доходности и прибыли
        function calculateProfit() {
            const ltcPrice = parseFloat(document.getElementById("ltcPrice").value);
            const dogePrice = parseFloat(document.getElementById("dogePrice").value);
            const bellPrice = parseFloat(document.getElementById("bellPrice").value);
            const usdtPrice = parseFloat(document.getElementById("usdtPrice").value);
            const profitPerLTC = parseFloat(document.getElementById("profitPerLTC").value);
            const profitPerDOGE = parseFloat(document.getElementById("profitPerDOGE").value);
            const profitPerBELL = parseFloat(document.getElementById("profitPerBELL").value);

            if (isNaN(ltcPrice) || isNaN(dogePrice) || isNaN(bellPrice) || isNaN(usdtPrice) ||
                isNaN(profitPerLTC) || isNaN(profitPerDOGE) || isNaN(profitPerBELL)) {
                alert("Данные для расчета отсутствуют или некорректны.");
                return;
            }

            let a = parseFloat(document.getElementById("hashrate").textContent);
            let b = parseFloat(document.getElementById("power").textContent);
            let h = parseFloat(document.getElementById("electricityCost").value);
            let c = parseFloat(document.getElementById("asicCost").value);

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
