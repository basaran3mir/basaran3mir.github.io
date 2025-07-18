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

    function typewriterEffect(element, text, typewriterSpeed) {
        element.innerHTML = '';
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index++);
            } else {
                clearInterval(interval);
                completeTyping()
            }
        }, typewriterSpeed);

        function completeTyping() {
            setTimeout(() => {
                typewriterEffect(surnameElement, "Software developer", 150);
            }, 3000);
        }
    }

    const surnameElement = document.querySelector(".jobname");
    if (surnameElement) {
        typewriterEffect(surnameElement, "Software developer", 150);
    }

});