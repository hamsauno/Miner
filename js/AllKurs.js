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
            if (lines.length >= 9) {
                const usdtPrice = parseFloat(lines[1].trim());
                const btcPrice = parseFloat(lines[0].trim());
                const ltcPrice = parseFloat(lines[5].trim());
                const dogePrice = parseFloat(lines[6].trim());
                const bellPrice = parseFloat(lines[7].trim());

                if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(profitPerTH)) {
                    document.getElementById("usdtPrice").value = btcPrice.toFixed(2);
                    document.getElementById("btcPrice").value = usdtPrice.toFixed(2);
                    document.getElementById("ltcPrice").value = profitPerTH.toFixed(2);
                    document.getElementById("dogePrice").value = profitPerTH.toFixed(4);
                    document.getElementById("bellPrice").value = profitPerTH.toFixed(4);
                } else {
                    console.error("Ошибка: Данные из файла не являются валидными числами.");
                    document.getElementById("usdtPrice").value = "Ошибка";
                    document.getElementById("btcPrice").value = "Ошибка";
                    document.getElementById("ltcPrice").value = "Ошибка";
                    document.getElementById("dogePrice").value = "Ошибка";
                    document.getElementById("bellPrice").value = "Ошибка";
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
    }
