document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll(".menu-link");

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const toggleBtn = document.querySelector('.toggle-button');
    const menu = document.querySelector('.mobile-sidebar');

    toggleBtn.addEventListener('click', function () {
        menu.classList.toggle('open');
    });

    const mobileMenuLinks = document.querySelectorAll(".mobile-sidebar .menu-link");

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menu.classList.toggle('open');
        });
    });

});