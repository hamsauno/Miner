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

    // Функция для обновления характеристик выбранной модели ASIC
    function updateAsicSpecs() {
        const asicData = {
            // antminer
            L917: { a:17, b:3360 },
            L916: { a:16, b:3360 },
            L915: { a:15, b:3360 },
            L79500: { a:9.5, b:3360 },
            L79300: { a:9.3, b:3360 },
            L79050: { a:9.05, b:3360 },
            // elphapex
            DG20hydro: { a:20, b:6200 },
            DG14: { a:14, b:3950 },
            DG13: { a: 13, b:3950 },
            DGhome: { a: 2.1, b:630 }
        };

// Функция обновления списка моделей
function updateModelList() {
    const manufacturerSelect = document.getElementById("manufacturerSelect");
    const modelSelect = document.getElementById("asicModel");

    const manufacturer = manufacturerSelect.value;
    modelSelect.innerHTML = ""; // Очищаем список

    if (asicModels[manufacturer]) {
        asicModels[manufacturer].forEach(model => {
            const option = document.createElement("option");
            option.value = model.value;
            option.textContent = model.text;
            modelSelect.appendChild(option);
        });
        modelSelect.selectedIndex = 0;
    }

    updateAsicSpecs();
}

// Функция обновления характеристик
function updateAsicSpecs() {
    const selectedModel = document.getElementById("asicModel").value;

    if (asicData[selectedModel]) {
        document.getElementById("hashrate").value = asicData[selectedModel].a;
        document.getElementById("power").value = asicData[selectedModel].b;
    } else {
        console.error(`Ошибка: Модель ${selectedModel} не найдена в asicData`);
    }
}

// Инициализация при загрузке
window.onload = updateModelList;
