import { applyStrings } from './language.js';
import { initUI } from './ui.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await applyStrings();
        await initUI();
    }
    catch(err) {
        console.error('Initialization failed:', err);
    }

});