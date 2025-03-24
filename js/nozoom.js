    document.addEventListener("wheel", function(event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
    });

    document.getElementById("electricityCost").addEventListener("input", function() {
    // Применение значения и сворачивание клавиатуры
    this.blur();
    calculateProfit();
    });
    
    document.getElementById("asicCost").addEventListener("input", function() {
        // Применение значения и сворачивание клавиатуры
        this.blur();
        calculateProfit();
    });
