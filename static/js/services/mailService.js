export function populateEmailLinks() {
    const localPart = ["e", "b", "a", "s", "a", "r", "a", "n", "w", "r", "k"].join("");
    const domain = ["g", "m", "a", "i", "l", ".", "c", "o", "m"].join("");

    const emailLinks = document.querySelectorAll(".email-link");

    emailLinks.forEach(link => {
        if (link) {
            link.href = `mailto:${localPart}@${domain}`;
        }
    });

    const emailTexts = document.querySelectorAll(".email-text");

    emailTexts.forEach(text => {
        if (text) {
            text.textContent = `${localPart}@${domain}`;
        }
    });
}

export function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                alert("Mesajınız başarıyla gönderildi!");
                form.reset();
            } else {
                alert("Bir hata oluştu, lütfen tekrar deneyin.");
            }
        } catch (err) {
            alert("Sunucuya ulaşılamıyor, lütfen tekrar deneyin.");
            console.error(err);
        }
    });
}