    // Функция для обновления характеристик выбранной модели ASIC
    function updateAsicSpecs() {
        const asicData = {
            L917: { a:17, b:3360 },
            L916: { a:16, b:3360 },
            L915: { a:15, b:3360 },
            DG14: { a:14, b:3950 },
            DG13: { a: 13, b:3950 },
            DGhome: { a: 2.1, b:630 }
        };

        let selectedModel = document.getElementById("asicModel").value;
        document.getElementById("hashrate").value = asicData[selectedModel].a;
        document.getElementById("power").value = asicData[selectedModel].b;
    }
