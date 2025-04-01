// Функция для отображения подменю
function toggleSubmenu() {
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.classList.toggle('hidden');
    });
}

// Функция для открытия/закрытия бокового меню
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    
    // Добавляем или удаляем классы для управления видимостью
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Проверяем, открыто ли меню
    if (sidebar.classList.contains('active')) {
        // Если меню открыто, показываем его
        sidebar.style.left = "0";  // Можно контролировать положение через left или использовать классы
        overlay.style.display = "block";
    } else {
        // Если меню закрыто, скрываем его
        sidebar.style.left = "-250px";
        overlay.style.display = "none";
    }
}

        // Функция для загрузки другой страницы в iframe
        function loadPage(page) {
            const iframe = document.getElementById("pageIframe");
            iframe.src = page;  // Устанавливаем источник для iframe
            iframe.style.display = "block";  // Показываем iframe
