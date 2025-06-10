import { createApiError } from "../apiErrors";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Retrieves data from the cache if it exists and is not expired.
 * @param {string} key - The cache key.
 * @returns {any|null} The cached data if valid, otherwise null.
 */
const getFromCache = (key: string) => {
    const cached = localStorage.getItem(key);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }
    return null;
};

/**
 * Stores data in the cache with a timestamp.
 * @param {string} key - The cache key.
 * @param {any} data - The data to be cached.
 */
const setToCache = (key: string, data: any) => {
    localStorage.setItem(
        key,
        JSON.stringify({
            data,
            timestamp: Date.now(),
        })
    );
};

/**
 * Transforms image URLs in the data to include full TMDB paths.
 * @param {any} data - The data to transform.
 * @returns {any} The transformed data.
 */
const transformImageUrls = (data: any) => {
    if (typeof data !== "object" || data === null) return data;

    if (Array.isArray(data)) {
        return data.map(transformImageUrls);
    }

    const transformed = { ...data };
    for (const [key, value] of Object.entries(transformed)) {
        if (typeof value === "string" && (key.includes("path") || key.includes("url"))) {
            if (value.startsWith("/")) {
                transformed[key] = `https://image.tmdb.org/t/p/w500${value}`;
                transformed[`${key}_original`] = `https://image.tmdb.org/t/p/original${value}`;
                transformed[`${key}_low`] = `https://image.tmdb.org/t/p/w92${value}`;
            }
        } else if (typeof value === "object" && value !== null) {
            transformed[key] = transformImageUrls(value);
        }
    }
    return transformed;
};

/**
 * Fetches data from The Movie Database (TMDB) API.
 *
 * @template T - The expected type of the response data.
 * @param {string} endpoint - The specific TMDB API endpoint to request (e.g., "/movie/popular").
 * @param {Record<string, unknown>} [params] - Optional key-value pairs for additional query parameters.
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response data.
 * @throws {ApiError} If the API request fails or returns a non-OK status.
 */
export const fetchFromTMDB = async <T>(
    endpoint: string,
    params?: Record<string, unknown>
): Promise<T> => {
    const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);
    url.searchParams.append("api_key", TMDB_API_KEY);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const cacheKey = url.toString();
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
        return cachedData as T;
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw createApiError(response.status, `TMDB API error: ${response.statusText}`);
    }
    const data = await response.json();
    const transformedData = transformImageUrls(data);
    setToCache(cacheKey, transformedData);
    return transformedData;
};