// Данные моделей по производителям
const asicModels = {
    antminer: [
        { value: "L917", text: "L9 17 GH/s" },
        { value: "L916", text: "L9 16 GH/s" },
        { value: "L915", text: "L9 15 GH/s" },
        { value: "L79500", text: "L7 9500 MH/s" },
        { value: "L79300", text: "L9 9300 MH/s" },
        { value: "L79050", text: "L9 9050 MH/s" }
    ],
    elphapex: [
        { value: "DG20hydro", text: "DG1 hydro 20 GH/s" },
        { value: "DG14", text: "DG1+ 14 GH/s" },
        { value: "DG13", text: "DG1+ 13 GH/s" },
        { value: "DGhome", text: "DG home-1 2.1 GH/s" }
    ]
};

// Характеристики моделей
const asicData = {
    // antminer
    L917: { a: 17, b: 3360 },
    L916: { a: 16, b: 3360 },
    L915: { a: 15, b: 3360 },
    L79500: { a: 9.5, b: 3360 },
    L79300: { a: 9.3, b: 3360 },
    L79050: { a: 9.05, b: 3360 },
    // elphapex
    DG20hydro: { a: 20, b: 6200 },
    DG14: { a: 14, b: 3950 },
    DG13: { a: 13, b: 3950 },
    DGhome: { a: 2.1, b: 630 }
};

// Функция обновления списка моделей
function updateModelList() {
    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const modelSelect = document.getElementById("asicModel");

    if (!manufacturerSelect || !modelSelect) {
        console.error("Ошибка: manufacturerSelect или modelSelect не найден");
        return;
    }

    const manufacturer = manufacturerSelect.value;
    modelSelect.innerHTML = ""; // Очищаем список

    if (asicModels[manufacturer]) {
        asicModels[manufacturer].forEach(model => {
            const option = document.createElement("option");
            option.value = model.value;
            option.textContent = model.text;
            modelSelect.appendChild(option);
        });
        modelSelect.selectedIndex = 0; // Выбираем первый элемент
    }

    // Проверяем, есть ли хотя бы одна модель перед вызовом updateAsicSpecs
    if (modelSelect.value) {
        updateAsicSpecs();
    }
}

// Функция обновления характеристик
function updateAsicSpecs() {
    const modelSelect = document.getElementById("asicModel");

    if (!modelSelect || modelSelect.value === "") {
        console.warn("updateAsicSpecs: модель не выбрана");
        return;
    }

    const selectedModel = modelSelect.value;

    if (asicData[selectedModel]) {
        document.getElementById("hashrate").value = asicData[selectedModel].a;
        document.getElementById("power").value = asicData[selectedModel].b;
    } else {
        console.error(`Ошибка: Модель "${selectedModel}" не найдена в asicData`);
        document.getElementById("hashrate").value = "";
        document.getElementById("power").value = "";
    }
}

window.onload = async function() {
    await fetchData();
    updateModelList(); // Инициализация списка моделей
    document.getElementById("manufacturerSelect").addEventListener("change", updateModelList);
    document.getElementById("asicModel").addEventListener("change", updateAsicSpecs);
};


 //Функция для получения данных с удалённого текстового файла
async function fetchData() {
    const url = "https://hamsauno.github.io/Miner/kursBTC.txt"; 

    try {
        const response = await fetch(url);
        console.log("Ответ от сервера:", response);

        if (!response.ok) {
            throw new Error('Не удалось загрузить данные. Статус: ' + response.status);
        }

        const data = await response.text();
        console.log("Полученные данные:", data);

        if (!data || data.trim().length === 0) {
            throw new Error('Загруженные данные пусты.');
        }

        // Разделяем данные на строки и убираем лишние пробелы
        let lines = data.trim().split("\n").map(line => line.trim());
        console.log("Обработанные строки:", lines);

        // Проверяем, что данных достаточно
        if (lines.length < 9) {
            throw new Error(`Ошибка: недостаточно строк в файле (ожидалось 9, получено ${lines.length})`);
        }

        // Функция парсинга чисел с заменой запятой на точку
        const parseValue = (str) => parseFloat(str.replace(",", "."));

        const ltcPrice = parseValue(lines[3]);
        const dogePrice = parseValue(lines[4]);
        const bellPrice = parseValue(lines[5]);
        const usdtPrice = parseValue(lines[1]);
        const profitPerLTC = parseValue(lines[6]);
        const profitPerDOGE = parseValue(lines[7]);
	const profitPerBELL = parseValue(lines[8]);
       

        console.log("ltcPrice:", ltcPrice);
        console.log("dogePrice:", dogePrice);
        console.log("bellPrice:", bellPrice);
        console.log("usdtPrice:", usdtPrice);
        console.log("profitPerLTC:", profitPerLTC);
        console.log("profitPerDOGE:", profitPerDOGE);
        console.log("profitPerBELL:", profitPerBELL);

        // Проверяем корректность данных
        if ([ltcPrice, dogePrice, bellPrice, usdtPrice, profitPerLTC, profitPerDOGE, profitPerBELL].some(isNaN)) {
            throw new Error("Некоторые значения в файле не являются числами.");
        }

        // Заполняем скрытые поля
        document.getElementById("ltcPrice").value = ltcPrice.toFixed(2);
        document.getElementById("dogePrice").value = dogePrice.toFixed(4);
        document.getElementById("bellPrice").value = bellPrice.toFixed(4);
        document.getElementById("usdtPrice").value = usdtPrice.toFixed(8);
        document.getElementById("profitPerLTC").value = profitPerLTC.toFixed(8);
        document.getElementById("profitPerDOGE").value = profitPerDOGE.toFixed(8);
        document.getElementById("profitPerBELL").value = profitPerBELL.toFixed(8);

    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        alert("Ошибка загрузки данных. Проверьте доступность файла.");
    }
}


