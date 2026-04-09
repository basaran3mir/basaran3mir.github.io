export function populateEmailLinks() {
    const user = "ebasaran999";
    const domain = "gmail.com";

    const emailLinks = document.querySelectorAll(".email-link");

    emailLinks.forEach(link => {
        if (link) {
            link.href = `mailto:${user}@${domain}`;
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