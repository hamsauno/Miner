    document.addEventListener("wheel", function(event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
    });

        function calculateProfit() {
            // Ваш код для расчёта
            console.log("Расчёт обновлён");
        }

        function applyValue(inputId) {
            var input = document.getElementById(inputId);
            input.blur();  // Скрывает клавиатуру
            calculateProfit();  // Вызывает функцию для пересчёта
        }
