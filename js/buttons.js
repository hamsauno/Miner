document.addEventListener("DOMContentLoaded", function() {
    const mainButton = document.querySelector(".main-button");
    const leftButton = document.querySelector(".left-button");
    const rightButton = document.querySelector(".right-button");

    let buttonsVisible = false; // Флаг для отслеживания состояния кнопок

    // При клике на главную кнопку боковые кнопки плавно появляются/исчезают
    mainButton.addEventListener("click", function() {
        if (!buttonsVisible) {
            leftButton.style.transform = "translateX(-200%)";
            rightButton.style.transform = "translateX(200%)";
        } else {
            leftButton.style.transform = "translateX(-150%)";
            rightButton.style.transform = "translateX(150%)";
        }
        buttonsVisible = !buttonsVisible; // Инвертируем флаг
    });

    // Перенаправление по страницам при нажатии на боковые кнопки
    leftButton.addEventListener("click", function() {
        window.location.href = "indexBTC.html"; // Замените ссылку
    });

    rightButton.addEventListener("click", function() {
        window.location.href = "indexLTC.html"; // Замените ссылку
    });

    // Главная кнопка тоже может перенаправлять (по желанию)
    mainButton.addEventListener("dblclick", function() {
        window.location.href = "calc.html"; // Замените ссылку
    });
});
