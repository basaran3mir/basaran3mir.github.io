import { getCachedData, setCachedData } from './cacheService.js';

export async function getGithubRepos() {
    const username = "basaran3mir";
    const cacheKey = "github_repos_cache";
    const cacheValue = getCachedData(cacheKey);

    if (cacheValue) return cacheValue;

    const fallback = [{
        html_url: `https://github.com/${username}?tab=repositories`,
        has_pages: false,
        name: "github-repositories",
        description: "An issue occurred with the GitHub API."
    }];

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        if (!data || !Array.isArray(data) || data.length === 0) return fallback;
        setCachedData(cacheKey, data);
        return data;
    } catch {
        return fallback;
    }
}