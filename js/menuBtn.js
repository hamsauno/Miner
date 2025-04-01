        function toggleMenu() {
            const sidebar = document.getElementById("sidebar");
            const overlay = document.getElementById("overlay");

            if (sidebar.style.left === "0px") {
                sidebar.style.left = "-250px";
                overlay.style.display = "none";
            } else {
                sidebar.style.left = "0px";
                overlay.style.display = "block";
            }
        }
