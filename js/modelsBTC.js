    // Функция для обновления характеристик выбранной модели ASIC
    function updateAsicSpecs() {
        const asicData = {
            S21XP: { a: 270, b: 3645 },
            S21pl235: { a: 235, b: 3878 },
            S21pl225: { a: 225, b: 3713 },
            S21pl216: { a: 216, b: 3564 },
            T21190: { a: 190, b: 3610 },
            S19k120: { a: 120, b: 2760 }
        };

        let selectedModel = document.getElementById("asicModel").value;
        document.getElementById("hashrate").value = asicData[selectedModel].a;
        document.getElementById("power").value = asicData[selectedModel].b;
    }
