// Проверяем, что код выполняется после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");

        // Переключаем класс для показа/скрытия меню
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    // Делаем функцию доступной глобально
    window.toggleMenu = toggleMenu;
});
