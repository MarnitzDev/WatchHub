import { fetchFromTMDB } from "./core";
import { IMovie } from "@/types/Movie.ts";
import { ISeries } from "@/types/Series.ts";

/**
 * Fetches popular people from TMDB.
 *
 * @param page - Page number (default: 1).
 * @returns Promise resolving to popular people.
 */
export const fetchPopularPeople = async (page = 1) => {
    return fetchFromTMDB("/person/popular", { page });
};

/**
 * Fetches person details including movie and TV credits.
 *
 * @param personId - TMDB person ID.
 * @returns Promise resolving to person details.
 * @throws {ApiError} On API request failure.
 */
export const fetchTMDBPersonDetails = async (personId: number) => {
    return fetchFromTMDB(`/person/${personId}`, { append_to_response: "movie_credits,tv_credits" });
};

/**
 * Fetches known for movies for a specific person from TMDB.
 *
 * @param personId - TMDB person ID.
 * @returns Promise resolving to known for movies, sorted by popularity and limited to top 10.
 */
export const fetchKnownForMovies = async (personId: number): Promise<IMovie[]> => {
    const data = await fetchFromTMDB<{ cast: IMovie[] }>(`/person/${personId}/movie_credits`);

    // Sort the cast by popularity and slice to get the top 10 movies
    return data.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10)
        .map((movie) => ({
            ...movie,
            media_type: "movie",
        }));
};

/**
 * Fetches known for TV series for a specific person from TMDB.
 *
 * @param personId - TMDB person ID.
 * @returns Promise resolving to known for TV series, sorted by vote count and popularity, limited to top 10.
 */
export const fetchKnownForSeries = async (personId: number): Promise<ISeries[]> => {
    const data = await fetchFromTMDB<{ cast: ISeries[] }>(`/person/${personId}/tv_credits`);

    // Sort the cast by a combination of factors
    return data.cast
        .sort((a, b) => {
            // Prioritize series with higher vote counts
            const voteCountDiff = (b.vote_count || 0) - (a.vote_count || 0);
            if (voteCountDiff !== 0) return voteCountDiff;

            // If vote counts are equal, compare popularity
            return (b.popularity || 0) - (a.popularity || 0);
        })
        .slice(0, 10)
        .map((series) => ({
            ...series,
            media_type: "tv",
            character: series.character || "Unknown Role",
        }));
};