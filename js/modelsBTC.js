// Данные моделей по производителям
const asicModels = {
    antminer: [
        { value: "S21XP", text: "S21 XP 270Th" },
        { value: "S21pro245", text: "S21 pro 245Th" },
        { value: "S21pro234", text: "S21 pro 234Th" },
        { value: "S21pl235", text: "S21+ 235Th" },
        { value: "S21pl225", text: "S21+ 225Th" },
        { value: "S21pl216", text: "S21+ 216Th" },
        { value: "T21190", text: "T21 190Th" },
        { value: "S21200", text: "S21 200Th" },
        { value: "S21195", text: "S21 195Th" },
        { value: "S21188", text: "S21 188Th" },
        { value: "S19k120", text: "S19k Pro 120Th" },
        { value: "S19k115", text: "S19k Pro 115Th" },
        { value: "S19k110", text: "S19k Pro 110Th" }
    ],
    whatsminer: [
        { value: "M60S206", text: "M60S+ 17W 206 TH/s" },
        { value: "M60S204", text: "M60S+ 17W 204 TH/s" },
        { value: "M60S200", text: "M60S+ 17W 200 TH/s" },
        { value: "M60S190", text: "M60S 18,5W 190 TH/s" },
        { value: "M60S188", text: "M60S 18,5W 188 TH/s" },
        { value: "M60S184", text: "M60S 18,5W 184 TH/s" },
        { value: "M61208", text: "M61 19W 208 TH/s" },
        { value: "M61206", text: "M61 19W 206 TH/s" },
        { value: "M61204", text: "M61 19,9W 204 TH/s" },
        { value: "M61202", text: "M61 19,9W 202 TH/s" },
        { value: "M61200", text: "M61 19,9W 200 TH/s" },
        { value: "M60178", text: "M60 19W 178 TH/s" },
        { value: "M60176", text: "M60 19W 176 TH/s" },
        { value: "M60172", text: "M60 19,9W 172 TH/s" },
        { value: "M50S158", text: "M50S++ 22W 158 TH/s" },
        { value: "M50S148", text: "M50S++ 22W 148 TH/s" },
        { value: "M50S134", text: "M50S 26W 134 TH/s" },
        { value: "M50S132", text: "M50S 26W 132 TH/s" },
        { value: "M50S130", text: "M50S 26W 130 TH/s" },
        { value: "M50S128", text: "M50S 26W 128 TH/s" },
        { value: "M50S126", text: "M50S 26W 126 TH/s" },
        { value: "M50S124", text: "M50S 26W 124 TH/s" }
    ],
    avalon: [
        { value: "A1566212", text: "Avalon A1566 212TH/s" },
        { value: "A1566209", text: "Avalon A1566 209TH/s" },
        { value: "mini3", text: "Avalon Mini-3 37.5TH/s" }
    ]
};

// Данные характеристик ASIC
const asicData = {
    // antminer
    S21XP: { a: 270, b: 3645 },
    S21pro245: { a: 245, b: 3675 },
    S21pro234: { a: 234, b: 3510 },
    S21pl235: { a: 235, b: 3878 },
    S21pl225: { a: 225, b: 3713 },
    S21pl216: { a: 216, b: 3564 },
    T21190: { a: 190, b: 3610 },
    S21200: { a: 200, b: 3500 },
    S21195: { a: 195, b: 3413 },
    S21188: { a: 188, b: 3290 },
    S19k120: { a: 120, b: 2760 },
    S19k115: { a: 115, b: 2645 },
    S19k110: { a: 110, b: 2530 },
    // whatsminer
    M60S206: { a: 206, b: 3502 },
    M60S204: { a: 204, b: 3468 },
    M60S200: { a: 200, b: 3400 },
    M60S190: { a: 190, b: 3515 },
    M60S188: { a: 188, b: 3478 },
    M60S184: { a: 184, b: 3404 },
    M61208: { a: 208, b: 3952 },
    M61206: { a: 206, b: 3914 },
    M61204: { a: 204, b: 4060 },
    M61202: { a: 202, b: 4020 },
    M61200: { a: 200, b: 3980 },
    M60178: { a: 178, b: 3382 },
    M60176: { a: 176, b: 3344 },
    M60172: { a: 172, b: 3423 },
    M50S158: { a: 158, b: 3476 },
    M50S148: { a: 148, b: 3256 },
    M50S134: { a: 134, b: 3484 },
    M50S132: { a: 132, b: 3432 },
    M50S130: { a: 130, b: 3380 },
    M50S128: { a: 128, b: 3328 },
    M50S126: { a: 126, b: 3276 },
    M50S124: { a: 124, b: 3224 },
    // avalon
    A1566212: { a: 212, b: 3922 },
    A1566209: { a: 209, b: 3867 },
    mini3: { a: 37.5, b: 800 }
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
        // Присваиваем хешрейт и потребление в текстовые элементы <span>
        document.getElementById("hashrate").textContent = asicData[selectedModel].a;
        document.getElementById("power").textContent = asicData[selectedModel].b;
    } else {
        console.error(`Ошибка: Модель "${selectedModel}" не найдена в asicData`);
        document.getElementById("hashrate").textContent = "";
        document.getElementById("power").textContent = "";
    }
}

window.onload = async function() {
    await fetchData();
    updateModelList(); // Инициализация списка моделей
    document.getElementById("manufacturerSelect").addEventListener("change", updateModelList);
    document.getElementById("asicModel").addEventListener("change", updateAsicSpecs);
};

// Функция для получения данных с удалённого текстового файла
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

        // Разбиваем данные на строки
        const lines = data.trim().split("\n");

        // Убедимся, что строк достаточно для всех данных
        if (lines.length >= 3) {
            const btcPrice = parseFloat(lines[0].trim());
            const usdtPrice = parseFloat(lines[1].trim());
            const profitPerTH = parseFloat(lines[2].trim());

            if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(profitPerTH)) {
                document.getElementById("btcPrice").value = btcPrice.toFixed(2);
                document.getElementById("usdtPrice").value = usdtPrice.toFixed(2);
                document.getElementById("profitPerTH").value = profitPerTH.toFixed(8);
            } else {
                throw new Error("Данные из файла не являются валидными числами.");
            }
        } else {
            throw new Error("Недостаточно строк в файле.");
        }
    } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        document.getElementById("btcPrice").value = "Ошибка при загрузке данных.";
        document.getElementById("usdtPrice").value = "Ошибка при загрузке данных.";
        document.getElementById("profitPerTH").value = "Ошибка при загрузке данных.";
    }
}
