import { useQuery } from "@tanstack/react-query";
import { fetchMovieCredits } from "@/api/tmdb";

export const useMovieCredits = (movieId: number) => {
    return useQuery({
        queryKey: ["movieCredits", movieId],
        queryFn: () => fetchMovieCredits(movieId),
    });
};
