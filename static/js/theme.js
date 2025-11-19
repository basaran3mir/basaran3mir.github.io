export function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const icon = document.querySelector("#themeIcon");

    if (current === "light") {
        root.removeAttribute("data-theme");
        icon.classList.replace("lnr-moon", "lnr-sun");
    } else {
        root.setAttribute("data-theme", "light");
        icon.classList.replace("lnr-sun", "lnr-moon");
    }
}