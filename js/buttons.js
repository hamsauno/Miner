document.addEventListener("DOMContentLoaded", function() {
    const mainButton = document.querySelector(".main-button");
    const leftButton = document.querySelector(".left-button");
    const rightButton = document.querySelector(".right-button");

    // При клике на главную кнопку боковые плавно появляются
    mainButton.addEventListener("click", function() {
        leftButton.style.transform = "translateX(-200%)";
        rightButton.style.transform = "translateX(200%)";
    });

    // Если снова кликнуть, кнопки спрячутся
    leftButton.addEventListener("click", function() {
        leftButton.style.transform = "translateX(-150%)";
        rightButton.style.transform = "translateX(150%)";
    });

    rightButton.addEventListener("click", function() {
        leftButton.style.transform = "translateX(-150%)";
        rightButton.style.transform = "translateX(150%)";
    });
});
