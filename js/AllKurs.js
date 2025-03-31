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
              if (lines.length >= 8) {
                const btcPrice = parseFloat(lines[0].trim()); // BTC
                const usdtPrice = parseFloat(lines[1].trim()); // USDT
                const ltcPrice = parseFloat(lines[5].trim()); // LTC
                const dogePrice = parseFloat(lines[6].trim()); // DOGE
                const bellPrice = parseFloat(lines[7].trim()); // BELL

                if (!isNaN(btcPrice) && !isNaN(usdtPrice) && !isNaN(ltcPrice) && !isNaN(dogePrice) && !isNaN(pbellPrice)) {
                    document.getElementById("usdtPrice").value = usdtPrice.toFixed(2);
                    document.getElementById("btcPrice").value = btcPrice.toFixed(2);
                    document.getElementById("ltcPrice").value = ltcPrice.toFixed(2);
                    document.getElementById("dogePrice").value = dogePrice.toFixed(4);
                    document.getElementById("bellPrice").value = bellPrice.toFixed(4);
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
            document.getElementById("usdtPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("btcPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("ltcPrice").value = "Ошибка при загрузке данных.";
            document.getElementById("dogePrice").value = "Ошибка при загрузке данных.";
            document.getElementById("bellPrice").value = "Ошибка при загрузке данных.";
        }
    }
    // Загружаем данные и обновляем элементы
    window.onload = async function() {
        await fetchData(); // Загружаем данные из файла kursBTC.txt
    }
