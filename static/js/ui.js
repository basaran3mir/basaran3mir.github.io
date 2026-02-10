import { getGithubRepos } from './services/githubService.js';
import { getMediumBlogs } from './services/mediumService.js';
import { toggleLanguage } from './language.js';
import { toggleTheme } from './theme.js';

const toggleBtn = document.querySelector(".navbar-togglebutton");
const menu = document.querySelector(".navbar");
const icon = document.querySelector("#toggleIcon");

export async function initUI() {
    setActiveMenuLink();
    setNavbarToggleButtonAction_mobile();
    setTurnOffNavbarOnPartClick_mobile();
    setYearRelationalElements();
    await showGithubRepos();
    await showMediumBlogs();
    checkInputFields();
    setOnClickFunctions();
}

function setActiveMenuLink() {
    const sections = document.querySelectorAll(".sub-content");
    const navLinks = document.querySelectorAll(".menu-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const href = link.getAttribute("href");
            navLinks.forEach(l => l.classList.remove("active"));
            navLinks.forEach(l => {
                if (l.getAttribute("href") === href) l.classList.add("active");
            });
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l => l.classList.remove("active"));
                document.querySelector(`.menu-link[href="#${id}"]`)?.classList.add("active");
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));
}

function setNavbarToggleButtonAction_mobile() {
    toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        icon.className = menu.classList.contains("open")
            ? "lnr lnr-cross icon-menu"
            : "lnr lnr-menu icon-menu";
    });
}

function setTurnOffNavbarOnPartClick_mobile() {
    document.querySelectorAll(".navbar .menu-link").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            icon.className = "lnr lnr-menu icon-menu";
        });
    });
}

function setYearRelationalElements() {
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear;

    const birthYear = 2001;
    document.getElementById("ageValue").textContent = currentYear - birthYear;
}

async function showGithubRepos() {
    const list = document.getElementById("githubRepoList");
    const repos = await getGithubRepos();
    list.innerHTML = "";

    const filtered = repos.filter(r => !r.name.toLowerCase().includes("basaran3mir"));

    filtered.forEach(repo => {
        const li = document.createElement("li");
        li.className = "portfolio";

        li.innerHTML = `
            <div class="portfolio-content">
                <h3 class="portfolio-name">${formatRepoName(repo.name)}</h3>
                <p class="portfolio-info">${formatRepoDescription(repo.description)}</p>
                ${repo.has_pages ? `
                    <div class="portfolio-links">
                        <a class="portfolio-link" href="https://basaran3mir.github.io/${repo.name}" target="_blank" aria-label="Live demo of ${formatRepoName(repo.name)}">
                            <i class="fa-solid fa-globe"></i>
                        </a>
                    </div>` : ""}
            </div>
        `;

        li.addEventListener("click", (e) => {
            if (!e.target.closest("a")) window.open(repo.html_url, "_blank");
        });

        list.appendChild(li);
    });

    function formatRepoName(name) {
        if (!name) return "No information available.";
        return name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
    }

    function formatRepoDescription(desc) {
        if (!desc) return "No information available.";
        return desc.length > 100 ? desc.slice(0, 100) + " ..." : desc;
    }
}

async function showMediumBlogs() {
    const list = document.getElementById("mediumBlogList");
    const blogs = await getMediumBlogs();
    list.innerHTML = "";

    blogs.forEach(blog => {
        const li = document.createElement("li");
        li.className = "blog";

        li.innerHTML = `
            <div class="blog-content">
                <h3 class="blog-name">${blog.title}</h3>
                <div class="blog-info">${formatBlogDescription(blog.description)}</div>
            </div>
        `;

        li.addEventListener("click", () => window.open(blog.link, "_blank"));
        list.appendChild(li);
    });

    function formatBlogDescription(desc) {
        if (!desc) return "No information available.";
        return desc.length > 100 ? desc.slice(0, 100) + " ..." : desc;
    }
}

function checkInputFields() {
    const fields = document.querySelectorAll(".input-field");
    fields.forEach(field => {
        const toggle = () => {
            const parent = field.closest(".form-part");
            parent?.classList.toggle("input-filled", field.value.trim() !== "");
        };
        toggle();
        field.addEventListener("input", toggle);
        field.addEventListener("blur", toggle);
    });
}

function setOnClickFunctions() {
    document.querySelector(".toggle-setting")?.addEventListener("click", toggleSettingsTab);
    document.querySelector(".theme-setting")?.addEventListener("click", toggleTheme);
    document.querySelector(".language-setting")?.addEventListener("click", toggleLanguage);
}

function toggleSettingsTab() {
    document.querySelector('.settings')?.classList.toggle("open");
}

