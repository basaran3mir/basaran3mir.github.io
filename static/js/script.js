document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.querySelectorAll(".menu a");

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
