// Функция для открытия/закрытия бокового меню
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    sidebar.classList.toggle("active");
    overlay.style.display = sidebar.classList.contains("active") ? "block" : "none";
}

// Функция для отображения подменю
function toggleSubmenu() {
    const links = document.querySelectorAll(".sidebar a");
    links.forEach(link => link.classList.toggle("hidden"));
}

// Функция загрузки страницы в iframe и скрытия меню
function loadPage(page) {
    const iframe = document.getElementById("pageIframe");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (iframe) {
        iframe.src = page;
        iframe.style.display = "block"; // Показываем iframe

        // Меняем URL в истории (без перезагрузки страницы)
        history.replaceState({}, "", page);
    }

    // Закрываем меню и убираем затемнение
    sidebar.classList.remove("active");
    overlay.style.display = "none";
}

// Закрытие меню при клике на затемнённый фон
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.addEventListener("click", toggleMenu);
    }
});

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
            const page = this.getAttribute("href");
            if (page) loadPage(page); // Загружаем страницу
        });
    });
});

function goHome() {
    const iframe = document.getElementById("pageIframe");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    iframe.src = ""; // Очищаем iframe
    iframe.style.display = "none"; // Скрываем iframe
    sidebar.classList.remove('active'); // Закрываем меню
    overlay.style.display = "none"; // Убираем затемнение
}
