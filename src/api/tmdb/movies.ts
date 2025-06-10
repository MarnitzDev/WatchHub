import { fetchFromTMDB } from "./core";
import { IMovie } from "@/types/Movie";

/**
 * Fetches popular movies from TMDB.
 *
 * @param page - Page number (default: 1).
 * @returns Promise resolving to popular movies.
 */
export const fetchTMDBPopularMovies = async (page = 1): Promise<{ results: IMovie[] }> => {
    return fetchFromTMDB("/movie/popular", { page });
};

/**
 * Fetches trending movies from TMDB.
 *
 * @param timeWindow - Time window for trending movies ("day" or "week").
 * @returns Promise resolving to trending movies.
 */
export const fetchTMDBTrendingMovies = async (
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
export const fetchTMDBMovieDetails = async (movieId: number): Promise<IMovie> => {
    return fetchFromTMDB(`/movie/${movieId}`);
};

/**
 * Fetches credits for a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie credits.
 */
export const fetchTMDBMovieCredits = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/credits`);
};

/**
 * Fetches videos associated with a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie videos.
 */
export const fetchTMDBMovieVideos = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/videos`);
};

/**
 * Fetches keywords associated with a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie keywords.
 */
export const fetchTMDBMovieKeywords = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/keywords`);
};

/**
 * Fetches release dates for a movie.
 *
 * @param movieId - TMDB movie ID.
 * @returns Promise resolving to movie release dates.
 */
export const fetchTMDBMovieReleaseDates = async (movieId: number) => {
    return fetchFromTMDB(`/movie/${movieId}/release_dates`);
};

/**
 * Fetches reviews for a specific movie from TMDB.
 *
 * @param movieId - TMDB movie ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to movie reviews.
 */
export const fetchTMDBMovieReviews = async (movieId: number, page = 1) => {
    return fetchFromTMDB(`/movie/${movieId}/reviews`, { page });
};

/**
 * Fetches recommended movies for a specific movie from TMDB.
 *
 * @param movieId - TMDB movie ID.
 * @param page - Page number (default: 1).
 * @returns Promise resolving to recommended movies.
 */
export const fetchTMDBRecommendedMovies = async (
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
export const fetchTMDBMovieCertifications = async () => {
    return fetchFromTMDB(`/certification/movie/list`);
};
