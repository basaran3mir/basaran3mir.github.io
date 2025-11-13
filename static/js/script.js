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

    function init() {
        setActiveMenuLink()
        setMobileSidebarToggleButtonAction()
        turnOffMobilSidebarOnPartClick()
        jobnametypewriterEffect()
        calculateAge()
        showGithubRepos()
        showMediumBlogs()
        checkInputFields()
    }

    function checkInputFields() {
        const fields = document.querySelectorAll('.input-field');

        const toggleLabel = (el) => {
            const formGroup = el.closest('.form-part');
            if (el.value.trim() !== '') {
                formGroup.classList.add('input-filled');
            } else {
                formGroup.classList.remove('input-filled');
            }
        };

        fields.forEach((field) => {
            toggleLabel(field);
            field.addEventListener('input', () => toggleLabel(field));
            field.addEventListener('blur', () => toggleLabel(field));
        });

    }

    function setActiveMenuLink() {
        const sections = document.querySelectorAll('.sub-content');
        const navLinks = document.querySelectorAll('.menu-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                const href = link.getAttribute('href');
                navLinks.forEach(item => item.classList.remove('active'));
                const matchingLinks = Array.from(navLinks).filter(item => item.getAttribute('href') === href);
                matchingLinks.forEach(matchedLink => matchedLink.classList.add('active'));
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('id');
                    const link = document.querySelector(`.menu-link[href="#${id}"]`);

                    if (entry.isIntersecting) {
                        navLinks.forEach((l) => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            },
            {
                root: null,
                threshold: 0.4,
            }
        );

        sections.forEach((section) => observer.observe(section));
    }

    function setMobileSidebarToggleButtonAction() {
        const toggleBtn = document.querySelector('.sidebar-togglebutton');
        const menu = document.querySelector('.sidebar');

        toggleBtn.addEventListener('click', function () {
            menu.classList.toggle('open');

            const icon = toggleBtn.querySelector('i');

            if (menu.classList.contains('open')) {
                icon.className = 'lnr lnr-cross icon-menu';
            } else {
                icon.className = 'lnr lnr-menu icon-menu';
            }

        });
    }

    function turnOffMobilSidebarOnPartClick() {
        const menu = document.querySelector('.sidebar');
        const mobileMenuLinks = document.querySelectorAll(".sidebar .menu-link");

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
        document.getElementById("ageValue").textContent = age;
    }

    async function getGithubRepos() {
        const cacheKey = "github_repos_cache";
        const cacheTimeKey = "github_repos_cache_time";
        const twoDays = 2 * 24 * 60 * 60 * 1000;

        const cachedData = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);
        const now = Date.now();

        if (cachedData && cachedTime && (now - cachedTime < twoDays)) {
            console.log("Github repos coming from cache.")
            return JSON.parse(cachedData);
        }

        const fallbackRepo = [{
            html_url: "https://github.com/basaran3mir?tab=repositories",
            has_pages: false,
            name: "github-repositories",
            description: "An issue occurred with the GitHub API. You can still view my portfolio on my GitHub profile.",
        }];

        try {
            const response = await fetch(`https://api.github.com/users/basaran3mir/repos`);
            const data = await response.json();

            if (!data || data.length === 0) {
                return fallbackRepo;
            }

            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(cacheTimeKey, now);

            console.log("Github repos coming from API.")
            return data;
        } catch (error) {
            console.error("Failed to retrieve GitHub data:", error);
            return fallbackRepo;
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
                    <h3 class="portfolio-name">${formatGithubRepoName(repo.name)}</h3>
                    <p class="portfolio-info">
                        ${formatGithubRepoDescription(repo.description)}
                    </p>
                    ${repo.has_pages ? `
                        <div class="portfolio-links">
                            <a class="portfolio-link" href="${formatGithubRepoPage(repo.name)}" aria-label="Portfolio website" target="_blank">
                                <i class="fa-solid fa-globe"></i> 
                            </a>
                        </div>
                    ` : ''}
                </div>
            `;

            li.addEventListener('click', (event) => {
                if (event.target.closest('a')) {
                    return;
                }
                window.open(repo.html_url, '_blank');
            });

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

    async function getMediumBlogs() {
        const cacheKey = "medium_blogs_cache";
        const cacheTimeKey = "medium_blogs_cache_time";
        const twoDays = 2 * 24 * 60 * 60 * 1000;

        const cachedData = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);
        const now = Date.now();

        if (cachedData && cachedTime && (now - cachedTime < twoDays)) {
            console.log("Medium blogs coming from cache.")
            return JSON.parse(cachedData);
        }

        const fallbackBlog = [{
            link: "https://medium.com/@basaran3mir",
            title: "Medium Blogs",
            description: "An issue occurred while fetching Medium posts. You can still view them on my Medium profile.",
        }];

        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://basaran3mir.medium.com/feed`);
            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                return fallbackBlog;
            }

            localStorage.setItem(cacheKey, JSON.stringify(data.items));
            localStorage.setItem(cacheTimeKey, now);

            console.log("Medium coming from API.")
            return data.items;
        } catch (error) {
            console.error("Failed to retrieve Medium data:", error);
            return fallbackBlog;
        }
    }

    async function showMediumBlogs() {
        const list = document.getElementById("mediumBlogList");
        list.innerHTML = "";

        let blogs = await getMediumBlogs();

        blogs.forEach(blog => {
            const li = document.createElement("li");
            li.className = "blog";

            li.innerHTML = `
                <div class="blog-content">
                    <h3 class="blog-name">${blog.title}</h3>
                    <div class="blog-info">
                        ${formatMediumBlogDescription(blog.description)}
                    </div>
                </div>
            `;

            li.addEventListener('click', (event) => {
                if (event.target.closest('a')) {
                    return;
                }
                window.open(blog.link, '_blank');
            });

            list.appendChild(li);
        });

        function formatMediumBlogDescription(blog_description) {
            if (!blog_description) {
                return "No information available.";
            }

            if (blog_description.length > 100) {
                return blog_description.slice(0, 100) + " ...";
            }

            return blog_description;
        }
    }

    init()

});