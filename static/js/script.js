document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById("desktopSidebar");
    const menuToggle = document.getElementById("menuToggle");
    const menuLinks = document.querySelectorAll(".menu-link");

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar.classList.remove("open");
            }
        });
    });

    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
});
