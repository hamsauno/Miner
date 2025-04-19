// Функция для обновления значений в зависимости от валюты
function updateCurrency(isRuble) {
    const income = parseFloat(document.getElementById("income").innerText) || 0;
    const profit = parseFloat(document.getElementById("profit").innerText) || 0;
    const roi = parseFloat(document.getElementById("roi").innerText) || 0;
    const payback = parseFloat(document.getElementById("payback").innerText) || 0;

    const incomeMonth = parseFloat(document.getElementById("incomeMonth").innerText) || 0;
    const profitMonth = parseFloat(document.getElementById("profitMonth").innerText) || 0;
    const incomeYear = parseFloat(document.getElementById("incomeYear").innerText) || 0;
    const profitYear = parseFloat(document.getElementById("profitYear").innerText) || 0;

    const symbol = isRuble ? '₽' : '$';

    document.getElementById("currencySymbol").innerText = symbol;
    document.getElementById("currencySymbolMonth").innerText = symbol;
    document.getElementById("currencySymbolYear").innerText = symbol;

    // Если рубли, конвертируем
    if (isRuble) {
        document.getElementById("income").innerText = (income * usdtPrice).toFixed(2);
        document.getElementById("profit").innerText = (profit * usdtPrice).toFixed(2);
        document.getElementById("incomeMonth").innerText = (incomeMonth * usdtPrice).toFixed(2);
        document.getElementById("profitMonth").innerText = (profitMonth * usdtPrice).toFixed(2);
        document.getElementById("incomeYear").innerText = (incomeYear * usdtPrice).toFixed(2);
        document.getElementById("profitYear").innerText = (profitYear * usdtPrice).toFixed(2);
    } else {
        document.getElementById("income").innerText = income.toFixed(2);
        document.getElementById("profit").innerText = profit.toFixed(2);
        document.getElementById("incomeMonth").innerText = incomeMonth.toFixed(2);
        document.getElementById("profitMonth").innerText = profitMonth.toFixed(2);
        document.getElementById("incomeYear").innerText = incomeYear.toFixed(2);
        document.getElementById("profitYear").innerText = profitYear.toFixed(2);
    }
}

// Обработчик изменения состояния тумблера
document.getElementById("currencyToggle").addEventListener("change", function () {
    const isRuble = this.checked;
    document.getElementById("currencyLabel").innerText = isRuble ? "RUB" : "USD";
    updateCurrency(isRuble);
});

// Инициализация с USD
updateCurrency(false);
