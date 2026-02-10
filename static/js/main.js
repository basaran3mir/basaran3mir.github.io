import { initUI } from './ui.js';
import { applyStrings } from './language.js';


document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initUI();
        await applyStrings();
        console.log(localStorage);
    }
    catch(err) {
        console.error('Initialization failed:', err);
    }

});