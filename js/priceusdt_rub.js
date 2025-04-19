const usdtPrice = 75; // курс можно загружать динамически

function updateRubTable() {
    const usdIds = ['income', 'incomeMonth', 'incomeYear', 'profit', 'profitMonth', 'profitYear'];
    
    usdIds.forEach(id => {
        const usdVal = parseFloat(document.getElementById(id).innerText) || 0;
        const rubId = id + '_rub';
        const rubVal = (usdVal * usdtPrice).toFixed(2);
        document.getElementById(rubId).innerText = rubVal;
    });
}

// Вызов при загрузке:
document.addEventListener("DOMContentLoaded", updateRubTable);
