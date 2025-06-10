import { fetchFromTMDB } from "./core";
import { ISeries } from "@/types/Series.ts";

/**
 * Fetches popular TV series from TMDB from the last 5 years, excluding kid shows.
 *
 * @param page - Page number (default: 1).
 * @param language - ISO 639-1 value to display translated data (default: 'en-US').
 * @param region - ISO 3166-1 code to filter release dates (optional).
 * @returns Promise resolving to popular TV series from the last 5 years, excluding kid shows.
 */
export const fetchTMDBPopularSeries = async (page = 1, language = "en-US", region?: string) => {
    const currentDate = new Date();
    const fiveYearsAgo = new Date(
        currentDate.getFullYear() - 5,
        currentDate.getMonth(),
        currentDate.getDate()
    );
    const formattedDate = fiveYearsAgo.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const params: Record<string, string | number> = {
        page,
        language,
        sort_by: "popularity.desc",
        "first_air_date.gte": formattedDate,
        with_original_language: "en",
        without_genres: "10762", // Exclude Kids genre
    };

    if (region) {
        params.region = region;
    }

    return fetchFromTMDB<{
        page: number;
        results: ISeries[];
        total_pages: number;
        total_results: number;
    }>("/discover/tv", params);
};

/**
 * Fetches TV series details from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series details.
 */
export const fetchTMDBSeriesDetails = async (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}`);
};

/**
 * Fetches credits for a specific TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series credits.
 */
export const fetchTMDBSeriesCredits = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/credits`);
};

/**
 * Fetches videos associated with a TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series videos.
 */
export const fetchTMDBSeriesVideos = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/videos`);
};

/**
 * Fetches keywords associated with a TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series keywords.
 */
export const fetchTMDBSeriesKeywords = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/keywords`);
};

/**
 * Fetches content ratings for a TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series content ratings.
 */
export const fetchTMDBSeriesContentRatings = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/content_ratings`);
};

/**
 * Fetches comprehensive series details including additional information.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to comprehensive series details.
 * @throws Error if fetching series details fails.
 */
export const fetchSeriesDetails = async (seriesId: number) => {
    try {
        const [series] = await Promise.all([fetchFromTMDB(`/tv/${seriesId}`)]);
        return {
            series,
        };
    } catch (error) {
        console.error("Error fetching series details:", error);
        throw new Error("Failed to fetch series details");
    }
};