function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Переключаем класс 'active' у sidebar и overlay
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

    console.log("Функция toggleMenu вызвана!");
}
