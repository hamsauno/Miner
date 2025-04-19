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

usdIds.forEach(id => {
    const usdElem = document.getElementById(id);
    const rubElem = document.getElementById(id + '_rub');

    if (!usdElem) console.warn(`Не найден элемент: ${id}`);
    if (!rubElem) console.warn(`Не найден элемент: ${id}_rub`);

    const usdVal = parseFloat(usdElem?.innerText) || 0;
    const rubVal = (usdVal * usdtPrice).toFixed(2);

    if (rubElem) rubElem.innerText = rubVal;
});

// Вызов при загрузке:
document.addEventListener("DOMContentLoaded", updateRubTable);
