export function getCachedData(cacheKey, duration = 2*24*60*60*1000) {
    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheKey + "_time");
    const now = Date.now();

    if (cached && cachedTime && now - parseInt(cachedTime, 10) < duration) {
        return JSON.parse(cached);
    }
    return null;
}

export function setCachedData(cacheKey, data) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheKey + "_time", Date.now().toString());
}
