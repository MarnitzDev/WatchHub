import { fetchFromTMDB } from "./core";
import { IMovie } from "@/types/Movie";

/**
 * Fetches popular movies from TMDB.
 *
 * @param page - Page number for pagination (default: 1).
 * @param limit - Number of movies per page (default: 18).
 * @returns Promise resolving to popular movies data.
 */
export const fetchPopularMovies = async (
    page: number = 1,
    limit: number = 18
): Promise<{ results: IMovie[]; page: number; total_pages: number }> => {
    const response = await fetchFromTMDB<{
        results: IMovie[];
        page: number;
        total_pages: number;
        total_results: number;
    }>("/movie/popular", { page });

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
 * Fetches trending movies from TMDB.
 *
 * @param timeWindow - Time window for trending movies ("day" or "week").
 * @returns Promise resolving to trending movies.
 */
export const fetchTrendingMovies = async (
    timeWindow: "day" | "week"
): Promise<{ results: IMovie[] }> => {
    return fetchFromTMDB(`/trending/movie/${timeWindow}`);
};

/**
 * Fetches detailed information about a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie details.
 */
export const fetchMovieDetails = async (movieId: number): Promise<IMovie> => {
    return fetchFromTMDB(`/movie/${movieId}`);
};

/**
 * Fetches credits for a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie credits.
 */
export const fetchMovieCredits = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/credits`);
};

/**
 * Fetches videos associated with a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie videos.
 */
export const fetchMovieVideos = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/videos`);
};

/**
 * Fetches keywords associated with a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie keywords.
 */
export const fetchMovieKeywords = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/keywords`);
};

/**
 * Fetches release dates for a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie release dates.
 */
export const fetchMovieReleaseDates = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/release_dates`);
};

/**
 * Fetches reviews for a specific movie from TMDB.
 *
 * @param movieId - TMDB movie ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to movie reviews.
 */
export const fetchMovieReviews = async (movieId: number, page = 1) => {
    return fetchFromTMDB(`/movie/${movieId}/reviews`, { page });
};

/**
 * Fetches recommended movies for a specific movie from TMDB.
 *
 * @param movieId - TMDB movie ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to recommended movies.
 */
export const fetchRecommendedMovies = async (
    movieId: number,
    page = 1
): Promise<{ results: IMovie[] }> => {
    return fetchFromTMDB(`/movie/${movieId}/recommendations`, { page });
};

/**
 * Fetches movie certifications.
 *
 * @returns Promise resolving to movie certifications.
 */
export const fetchMovieCertifications = async () => {
    return fetchFromTMDB(`/certification/movie/list`);
};
