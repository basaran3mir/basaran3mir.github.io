import { getCachedData, setCachedData } from './cacheService.js';

export async function getGithubRepos() {
    const cacheKey = "github_repos_cache";
    const cached = getCachedData(cacheKey);

    if (cached) return cached;

    const fallback = [{
        html_url: "https://github.com/basaran3mir?tab=repositories",
        has_pages: false,
        name: "github-repositories",
        description: "An issue occurred with the GitHub API."
    }];

    try {
        const response = await fetch("https://api.github.com/users/basaran3mir/repos");
        const data = await response.json();

        if (!data || !Array.isArray(data) || data.length === 0) return fallback;
        setCachedData(cacheKey, data);
        return data;
    } catch {
        return fallback;
    }
}