import { setTypewriterEffect } from "./typewriter.js";
import { getCachedData, setCachedData } from '/static/js/services/cacheService.js';

const cacheKey_currentLang = "current_lang";
const cacheKey_langStrings = "lang_strings";
const defaultLang = "en";

let currentLang = getCachedData(cacheKey_currentLang) || defaultLang;
if (!getCachedData(cacheKey_currentLang)) {
    setCachedData(cacheKey_currentLang, currentLang);
}

export async function loadStrings() { 
    const cached = getCachedData(cacheKey_langStrings); 
    if (cached && cached[currentLang]) { 
        return cached[currentLang]; 
    } 

    const response = await fetch("../static/assets/strings.json"); 
    const strings = await response.json(); 
    setCachedData(cacheKey_langStrings, strings); 
    return strings[currentLang]; 
}

function resolveValue(obj, path) {
    const keys = path.split('.');
    let acc = obj;

    for (const key of keys) {
        if (acc == null) {
            return undefined;
        }
        acc = acc[key];
    }

    return acc;
}

export async function applyStrings() {
    const strings = await loadStrings();

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.dataset.key;
        const value = resolveValue(strings, key);

        if (value == null) return;

        if (el.classList.contains("typewriter")) {
            setTypewriterEffect(el, value, 150, 2000);
        }
        else {
            el.textContent = value;
        }
    });
}

export function getCurrentLang() {
    return currentLang;
}

export function setCurrentLang(lang) {
    currentLang = lang;
    setCachedData(cacheKey_currentLang, lang)
}

export async function toggleLanguage() {
    const nextLang = getCurrentLang() === "en" ? "tr" : "en";
    setCurrentLang(nextLang);
    
    document.documentElement.lang = getCurrentLang();
    await applyStrings();
}