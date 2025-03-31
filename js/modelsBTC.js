// Данные моделей по производителям
const asicModels = {
    antminer: [
        { value: "S21XP", text: "Antminer S21 XP 270Th" },
        { value: "S21pl235", text: "Antminer S21+ 235Th" },
        { value: "S21pl225", text: "Antminer S21+ 225Th" },
        { value: "S21pl216", text: "Antminer S21+ 216Th" },
        { value: "T21190", text: "Antminer T21 190Th" },
        { value: "S19k120", text: "Antminer S19k Pro 120Th" }
    ],
    whatsminer: [
        { value: "M50S134", text: "M50S 26W  134 TH/s" },
        { value: "M50S132", text: "M50S 26W  132 TH/s" },
        { value: "M50S130", text: "M50S 26W  130 TH/s" },
        { value: "M50S128", text: "M50S 26W  128 TH/s" },
        { value: "M50S126", text: "M50S 26W  126 TH/s" },
        { value: "M50S124", text: "M50S 26W  124 TH/s" }
    ]
};

// Функция для обновления списка моделей при выборе производителя
function updateModelList() {
    const manufacturer = document.getElementById("manufacturerSelect").value;
    const modelSelect = document.getElementById("asicModel");

    // Очищаем предыдущие модели
    modelSelect.innerHTML = "";

    // Добавляем новые модели, соответствующие выбранному производителю
    asicModels[manufacturer].forEach(model => {
        const option = document.createElement("option");
        option.value = model.value;
        option.textContent = model.text;
        modelSelect.appendChild(option);
    });

    // Обновляем данные о модели (если есть функция)
    if (typeof updateAsicSpecs === "function") {
        updateAsicSpecs();
    }
}

// Вызываем функцию при загрузке страницы для установки значений по умолчанию
window.onload = function () {
    updateModelList();
};


    // Функция для обновления характеристик выбранной модели ASIC
    function updateAsicSpecs() {
        const asicData = {
            S21XP: { a: 270, b: 3645 },
            S21pl235: { a: 235, b: 3878 },
            S21pl225: { a: 225, b: 3713 },
            S21pl216: { a: 216, b: 3564 },
            T21190: { a: 190, b: 3610 },
            S19k120: { a: 120, b: 2760 },
            
            M50S134: { a: 134, b: 3484 },
            M50S132: { a: 132, b: 3432 },
            M50S130: { a: 130, b: 3380 },
            M50S128: { a: 128, b: 3328 },
            M50S126: { a: 126, b: 3276 },
            M50S124: { a: 124, b: 3224 },
            
        };

        let selectedModel = document.getElementById("asicModel").value;
        document.getElementById("hashrate").value = asicData[selectedModel].a;
        document.getElementById("power").value = asicData[selectedModel].b;
    }
