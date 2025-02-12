document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.menu a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar.classList.add("hidden");
            }

        });
    });

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("hidden");
        content.classList.toggle("shifted");
    });

});