import { getCachedData, setCachedData } from './cacheService.js';

export async function getMediumBlogs() {
    const cacheKey = "medium_blogs_cache";
    const cacheValue = getCachedData(cacheKey);

    if (cacheValue) return cacheValue;

    const fallback = [{
        link: "https://medium.com/@basaran3mir",
        title: "Medium Blogs",
        description: "An issue occurred fetching Medium posts."
    }];

    try {
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://basaran3mir.medium.com/feed");
        const tempData = await response.json();
        let data = tempData.items;

        if (!data || !Array.isArray(data) || data.length === 0) return fallback;
        setCachedData(cacheKey, data);
        return data;
    } catch {
        return fallback;
    }
}