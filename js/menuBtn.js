        // Функция для отображения подменю
        function toggleSubmenu() {
            const links = document.querySelectorAll('.sidebar a');
            links.forEach(link => {
                link.classList.toggle('hidden');
            });
        }

        // Функция для скрытия меню
        function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
