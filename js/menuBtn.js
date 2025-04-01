       // Функция для открытия/закрытия бокового меню
        function toggleMenu() {
            const sidebar = document.getElementById("sidebar");
            const overlay = document.getElementById("overlay");

            // Проверяем, открыто ли меню
            if (sidebar.style.left === "0px") {
                // Если меню открыто, скрываем его
                sidebar.style.left = "-250px";
                overlay.style.display = "none";
            } else {
                // Если меню закрыто, показываем его
                sidebar.style.left = "0";
                overlay.style.display = "block";
            }
        }
