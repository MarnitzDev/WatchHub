import { IMovie } from "@/types/Movie.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchMovieDetails } from "@/api/tmdb.ts";

export const usePopularMovies = (page = 1) => {
    return useQuery({
        queryKey: ["popularMovies", page],
        queryFn: async () => {
            interface TMDBResponse {
                results: IMovie[];
            }

            const tmdbData = (await fetchPopularMovies(page)) as TMDBResponse;

            // Fetch detailed information (including genres) for each movie
            return await Promise.all(
                tmdbData.results.map(async (movie: IMovie) => {
                    const detailData = (await fetchMovieDetails(movie.id)) as { genres: any[] };
                    return {
                        ...movie,
                        genres: detailData.genres,
                    };
                })
            );
        },
    });
};
