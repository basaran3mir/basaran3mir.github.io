import { getCachedData, setCachedData } from './cacheService.js';

export async function getMediumBlogs() {
    const cacheKey = "medium_blogs_cache";
    const username = "basaran3mir";
    const cacheValue = getCachedData(cacheKey);

    if (cacheValue) return cacheValue;

    const fallback = [{
        link: `https://medium.com/@${username}`,
        title: "Medium Blogs",
        description: "An issue occurred fetching Medium posts."
    }];

    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https:// ${username}.medium.com/feed`);
        const tempData = await response.json();
        let data = tempData.items;

        if (!data || !Array.isArray(data) || data.length === 0) return fallback;
        setCachedData(cacheKey, data);
        return data;
    } catch {
        return fallback;
    }
}