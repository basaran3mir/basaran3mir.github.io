document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll(".menu-link");

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
});