// Функция для отображения подменю
function toggleSubmenu() {
    const links = document.querySelectorAll('.sidebar a.hidden');
    links.forEach(link => {
        link.classList.toggle('hidden'); // Переключаем скрытие
    });
}

// Функция для открытия/закрытия бокового меню
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Если меню активно, скрываем
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.style.display = "none";
    } else {
        sidebar.classList.add('active');
        overlay.style.display = "block";
    }
}

// Функция для загрузки страницы в iframe
function loadPage(page) {
    const iframe = document.getElementById("pageIframe");
    iframe.src = page;
    iframe.style.display = "block";
}

// Ждём загрузку DOM перед добавлением обработчиков событий
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const submenuBtn = document.querySelector(".show-more-btn");

    if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
    if (submenuBtn) submenuBtn.addEventListener("click", toggleSubmenu);
});
