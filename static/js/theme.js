import { getCachedData, setCachedData } from '/static/js/services/cacheService.js';

const cacheKey_currentTheme = "current_theme";
const defaultTheme = "dark";

let currentTheme = getCachedData(cacheKey_currentTheme) || defaultTheme;
if (!getCachedData(cacheKey_currentTheme)) {
    setCachedData(cacheKey_currentTheme, currentTheme);
}

export function applyTheme() {
    const icon = document.querySelector("#themeIcon");
    const root = document.documentElement;

    if (currentTheme === "light") {
        root.setAttribute("data-theme", "light");
        icon.classList.replace("lnr-moon", "lnr-sun");
    } else {
        root.setAttribute("data-theme", "dark");
        icon.classList.replace("lnr-sun", "lnr-moon");
    }
}

export function getCurrentTheme() {
    return currentTheme;
}

export function setCurrentTheme(theme) {
    currentTheme = theme;
    setCachedData(cacheKey_currentTheme, theme);
}

export async function toggleTheme() {
    const nextTheme = getCurrentTheme() === "light" ? "dark" : "light";
    setCurrentTheme(nextTheme);
    
    applyTheme();
}