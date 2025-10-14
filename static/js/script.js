function toggleTheme(element) {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');

    if (currentTheme === 'light') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', 'light');
    }

    element.classList.toggle("rotate-180")
}

document.addEventListener('DOMContentLoaded', function () {

    function setActiveMenuLink() {
        const allMenuLinks = document.querySelectorAll(".menu-link");

        allMenuLinks.forEach(link => {
            link.addEventListener('click', function () {
                const href = link.getAttribute('href');
                allMenuLinks.forEach(item => item.classList.remove('active'));
                const matchingLinks = Array.from(allMenuLinks).filter(item => item.getAttribute('href') === href);
                matchingLinks.forEach(matchedLink => matchedLink.classList.add('active'));
            });
        });
    }

    function setMobileSidebarToggleButtonAction() {
        const toggleBtn = document.querySelector('.toggle-button');
        const menu = document.querySelector('.mobile-sidebar');

        toggleBtn.addEventListener('click', function () {
            menu.classList.toggle('open');
        });
    }

    function turnOffMobilSidebarOnPartClick() {
        const menu = document.querySelector('.mobile-sidebar');
        const mobileMenuLinks = document.querySelectorAll(".mobile-sidebar .menu-link");

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function () {
                menu.classList.toggle('open');
            });
        });
    }

    function typewriterEffect(element, text, typewriterSpeed) {
        element.innerHTML = '';
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index++);
            } else {
                clearInterval(interval);
                completeTyping()
            }
        }, typewriterSpeed);

        function completeTyping() {
            setTimeout(() => {
                typewriterEffect(element, "Software developer", 150);
            }, 2000);
        }
    }

    function jobnametypewriterEffect() {
        const jobnameElement = document.querySelector(".jobname");
        if (jobnameElement) {
            typewriterEffect(jobnameElement, "Software developer", 150);
        }
    }

    function calculateAge() {
        const birthYear = 2001;
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        document.getElementById("age-value").textContent = age;
    }

    async function getGithubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/basaran3mir/repos`);
            const data = await response.json();
            //console.log(data)
            return data;
        } catch (error) {
            console.error("Failed to retrieve GitHub data:", error);
            return [
                {
                    html_url: "https://github.com/basaran3mir?tab=repositories",
                    has_pages: false,
                    name: "github-repositories",
                    description: "An issue occurred with the GitHub API. You can still view my portfolio on my GitHub profile.",
                }
            ];
        }
    }

    async function showGithubRepos() {
        const list = document.getElementById("githubRepoList");
        list.innerHTML = "";

        const repos = await getGithubRepos();
        const filtered_repos = repos.filter(repo => !repo.name.toLowerCase().includes("basaran3mir")); //removed 'readme' and 'personal web site' github repo

        filtered_repos.forEach(repo => {
            const li = document.createElement("li");
            li.className = "portfolio";

            li.innerHTML = `
                <div class="portfolio-content">
                    <div class="portfolio-links">
                        <a class="portfolio-link" href="${repo.html_url}" target="_blank">
                            <i class="fa-solid fa-code"></i> 
                        </a>
                        ${repo.has_pages ? `
                            <a class="portfolio-link" href="${formatGithubRepoPage(repo.name)}" target="_blank">
                                <i class="fa-solid fa-globe"></i> 
                            </a>
                        ` : ''}
                    </div>
                    <h3 class="portfolio-name">${formatGithubRepoName(repo.name)}</h3>
                    <p class="portfolio-info">
                        ${formatGithubRepoDescription(repo.description)}
                    </p>
                </div>
            `;

            list.appendChild(li);
        });

        function formatGithubRepoName(repo_name) {
            if (!repo_name) {
                return "No information available.";
            }

            const formatted = repo_name
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            return formatted;
        }

        function formatGithubRepoDescription(repo_description) {
            if (!repo_description) {
                return "No information available.";
            }

            if (repo_description.length > 100) {
                return repo_description.slice(0, 100) + " ...";
            }

            return repo_description;
        }

        function formatGithubRepoPage(repo_name) {
            return ("https://basaran3mir.github.io/" + repo_name);
        }

    }

    setActiveMenuLink()
    setMobileSidebarToggleButtonAction()
    turnOffMobilSidebarOnPartClick()
    jobnametypewriterEffect()
    calculateAge()
    showGithubRepos()

    const url = "static/docs/cv.pdf";
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
    let pdfDoc = null;

    async function loadPdf() {
        pdfDoc = await pdfjsLib.getDocument(url).promise;

        let fullText = "";

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
        }

        const startKeyword = "Computer Engineer";
        const startIndex = fullText.indexOf(startKeyword);

        endKeyword = "VAKIFBANK"
        const endIndex = fullText.indexOf(endKeyword);


        let extractedText;
        if (startIndex !== -1) {
            extractedText = fullText.substring(startIndex, endIndex);
        } else {
            extractedText = "Belirtilen ifade PDF içinde bulunamadı.";
        }

        document.getElementById("output").textContent = extractedText;
    }

    loadPdf();

});