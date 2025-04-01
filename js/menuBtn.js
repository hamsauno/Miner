function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    console.log("Функция toggleMenu вызвана!"); // Проверяем, вызывается ли функция
    console.log("Состояние до:", sidebar.classList);

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

    console.log("Состояние после:", sidebar.classList);

    if (sidebar.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
}
