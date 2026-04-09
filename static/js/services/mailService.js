export function loadMailToFields() {
    const user = "ebasaran999";
    const domain = "gmail.com";

    const emailLinks = document.querySelectorAll(".email-link");

    emailLinks.forEach(link => {
        if (link) {
            link.href = `mailto:${user}@${domain}`;
        }
    });
}