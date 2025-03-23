// Функция для получения данных с удалённого текстового файла
    async function fetchData() {
        const url = "https://hamsauno.github.io/Miner/kursBTC.txt"; // Новый URL

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные.');
            }
            const data = await response.text();
            
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
                    console.error("Ошибка: Данные из файла не являются валидными числами.");
                    document.getElementById("btcPrice").value = "Ошибка";
                    document.getElementById("usdtPrice").value = "Ошибка";
                    document.getElementById("profitPerTH").value = "Ошибка";
                }
            } else {
                console.error("Ошибка: недостаточно строк в файле.");
            }
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
            document.getElementById("btcPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("usdtPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("profitPerTH").value = "Ошибка при загрузке данных.";
        }
    }
    // Загружаем данные и обновляем элементы
    window.onload = async function() {
        await fetchData(); // Загружаем данные из файла kursBTC.txt
        updateAsicSpecs(); // Обновляем характеристики ASIC
    }
