import { initUI } from './ui.js';
import { applyTheme } from './theme.js';
import { applyStrings } from './language.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initUI();
        applyTheme();
        await applyStrings();
    }
    catch(err) {
        console.error('Initialization failed:', err);
    }

});