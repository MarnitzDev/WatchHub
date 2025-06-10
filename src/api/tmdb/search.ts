import { fetchFromTMDB } from "./core";
import { ISearchCriteria } from "@/types/SearchCriteria.ts";
import { IMovie } from "@/types/Movie.ts";

/**
 * Performs a basic search for movies in TMDB.
 *
 * @param query - The search query string.
 * @param page - The page number of results to fetch (default: 1).
 * @returns Promise resolving to search results.
 */
export const searchMovies = async (query: string, page: number = 1) => {
    return fetchFromTMDB("/search/movie", { query, page });
};

/**
 * Performs an advanced search for movies in TMDB based on multiple criteria.
 *
 * @param searchCriteria - An object containing search parameters.
 * @param searchCriteria.query - Optional text query to search for in movie titles and descriptions.
 * @param searchCriteria.genres - Optional array of genre IDs to filter by.
 * @param searchCriteria.year - Optional release year to filter by.
 * @param searchCriteria.rating - Optional minimum rating to filter by.
 * @returns Promise resolving to an array of movies matching the search criteria.
 */
export const fetchAdvancedSearchMovies = async (
    searchCriteria: ISearchCriteria
): Promise<IMovie[]> => {
    const { query, genres, year, rating } = searchCriteria;
    const params: Record<string, string> = {
        include_adult: "false",
        sort_by: "popularity.desc",
    };

    if (query) {
        params.with_text_query = query;
    }

    if (genres && genres.length > 0) {
        params.with_genres = genres.join(",");
    }

    if (year) {
        params.primary_release_year = year.toString();
    }

    if (rating) {
        params["vote_average.gte"] = rating.toString();
    }

    const data = await fetchFromTMDB<{ results: IMovie[] }>("/discover/movie", params);
    return data.results;
};
