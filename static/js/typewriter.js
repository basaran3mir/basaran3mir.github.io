const activeTypewriters = new WeakMap();

export function setTypewriterEffect(element, text, speed, timeout) {
    if (!element) return;

    if (activeTypewriters.has(element)) {
        clearTimeout(activeTypewriters.get(element));
    }

    let index = 0;

    function type() {
        element.textContent = text.slice(0, index++);
        let timerId;
        if (index <= text.length) {
            timerId = setTimeout(type, speed);
        } else {
            timerId = setTimeout(() => { index = 0; type(); }, timeout);
        }
        activeTypewriters.set(element, timerId);
    }

    type();
}
