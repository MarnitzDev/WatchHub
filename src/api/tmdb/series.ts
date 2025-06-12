import { fetchFromTMDB } from "./core";
import { ISeries } from "@/types/Series.ts";

interface AggregateCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    roles: Array<{
        credit_id: string;
        character: string;
        episode_count: number;
    }>;
    total_episode_count: number;
    order: number;
}

interface AggregateCredits {
    cast: AggregateCast[];
    crew: any[]; // Define a more specific type if needed
    id: number;
}

/**
 * Fetches popular TV series from TMDB from the last 5 years, excluding kid shows.
 *
 * @param page - Page number for pagination (default: 1).
 * @param limit - Number of series per page (default: 18).
 * @param language - ISO 639-1 value to display translated data (default: 'en-US').
 * @param region - ISO 3166-1 code to filter release dates (optional).
 * @returns Promise resolving to popular TV series data.
 */
export const fetchPopularSeries = async (
    page: number = 1,
    limit: number = 18,
    language: string = "en-US",
    region?: string
): Promise<{ results: ISeries[]; page: number; total_pages: number }> => {
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

    const response = await fetchFromTMDB<{
        page: number;
        results: ISeries[];
        total_pages: number;
        total_results: number;
    }>("/discover/tv", params);

    // Limit the results on the client side
    const limitedResults = response.results.slice(0, limit);

    // Adjust total_pages based on the limit
    const adjustedTotalPages = Math.ceil(response.total_results / limit);

    return {
        results: limitedResults,
        page: response.page,
        total_pages: adjustedTotalPages,
    };
};

/**
 * Fetches TV series details from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series details.
 */
export const fetchSeriesDetails = async (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}`);
};

/**
 * Fetches aggregate credits for a specific TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series aggregate credits.
 */
export const fetchSeriesCredits = async (seriesId: number): Promise<AggregateCredits> => {
    const aggregateCredits = await fetchFromTMDB<AggregateCredits>(
        `/tv/${seriesId}/aggregate_credits`
    );

    // Process the cast to include the most significant role for each actor
    const processedCast = aggregateCredits.cast.map((actor) => ({
        ...actor,
        character: actor.roles.reduce((prev, current) =>
            current.episode_count > prev.episode_count ? current : prev
        ).character,
    }));

    return {
        ...aggregateCredits,
        cast: processedCast,
    };
};

/**
 * Fetches videos associated with a TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series videos.
 */
export const fetchSeriesVideos = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/videos`);
};

/**
 * Fetches keywords associated with a TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series keywords.
 */
export const fetchSeriesKeywords = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/keywords`);
};

/**
 * Fetches content ratings for a TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @returns Promise resolving to TV series content ratings.
 */
export const fetchSeriesContentRatings = (seriesId: number) => {
    return fetchFromTMDB(`/tv/${seriesId}/content_ratings`);
};

/**
 * Fetches reviews for a specific TV series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to TV series reviews.
 */
export const fetchSeriesReviews = async (seriesId: number, page = 1) => {
    const response = await fetchFromTMDB(`/tv/${seriesId}/reviews`, { page });
    return response.results;
};

/**
 * Fetches recommended TV series for a specific series from TMDB.
 *
 * @param seriesId - TMDB TV series ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to recommended TV series.
 */
export const fetchRecommendedSeries = async (
    seriesId: number,
    page = 1
): Promise<{ results: ISeries[] }> => {
    return fetchFromTMDB(`/tv/${seriesId}/recommendations`, { page });
};
