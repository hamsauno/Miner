// Функция загрузки страницы и скрытия меню
function loadPage(page) {
    const iframe = document.getElementById("pageIframe");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    iframe.src = page;
    iframe.style.display = "block"; // Показываем iframe

    // Закрываем меню и затемнение
    sidebar.classList.remove('active');
    overlay.style.display = "none";
}

// Ждём загрузку DOM перед добавлением обработчиков
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const submenuBtn = document.querySelector(".show-more-btn");
    const links = document.querySelectorAll(".sidebar a");

    if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
    if (submenuBtn) submenuBtn.addEventListener("click", toggleSubmenu);

    // Добавляем обработчики ко всем ссылкам в меню
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Отменяем стандартный переход
            loadPage(this.getAttribute("href")); // Загружаем страницу
        });
    });
});
