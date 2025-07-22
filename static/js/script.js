function toggleTheme(element) {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');

    if (currentTheme === 'light') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', 'light');
    }

    element.classList.toggle("rotate-180")
}

document.addEventListener('DOMContentLoaded', function () {

    function setActiveMenuLink() {
        const allMenuLinks = document.querySelectorAll(".menu-link");

        allMenuLinks.forEach(link => {
            link.addEventListener('click', function () {
                const href = link.getAttribute('href');
                allMenuLinks.forEach(item => item.classList.remove('active'));
                const matchingLinks = Array.from(allMenuLinks).filter(item => item.getAttribute('href') === href);
                matchingLinks.forEach(matchedLink => matchedLink.classList.add('active'));
            });
        });
    }

    function setMobileSidebarToggleButtonAction() {
        const toggleBtn = document.querySelector('.toggle-button');
        const menu = document.querySelector('.mobile-sidebar');

        toggleBtn.addEventListener('click', function () {
            menu.classList.toggle('open');
        });
    }

    function turnOffMobilSidebarOnPartClick() {
        const menu = document.querySelector('.mobile-sidebar');
        const mobileMenuLinks = document.querySelectorAll(".mobile-sidebar .menu-link");

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function () {
                menu.classList.toggle('open');
            });
        });
    }

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
                typewriterEffect(element, "Software developer", 150);
            }, 2000);
        }
    }

    function jobnametypewriterEffect() {
        const jobnameElement = document.querySelector(".jobname");
        if (jobnameElement) {
            typewriterEffect(jobnameElement, "Software developer", 150);
        }
    }

    function calculateAge() {
        const birthYear = 2001;
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        document.getElementById("age-value").textContent = age;
    }

    setActiveMenuLink()
    setMobileSidebarToggleButtonAction()
    turnOffMobilSidebarOnPartClick()
    jobnametypewriterEffect()
    calculateAge()

});