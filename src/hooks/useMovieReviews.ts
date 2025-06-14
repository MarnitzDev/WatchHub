import { useQuery } from "@tanstack/react-query";
import { fetchMovieReviews } from "@/api/tmdb";
import { ApiError, ApiErrorType } from "@/api/apiErrors.ts";

export const useMovieReviews = (movieId: number) => {
    return useQuery({
        queryKey: ["movieReviews", movieId],
        queryFn: async () => {
            const data = await fetchMovieReviews(movieId);
            if (
                typeof data === "object" &&
                data !== null &&
                "results" in data &&
                Array.isArray(data.results)
            ) {
                return data.results;
            }
            throw new ApiError(500, "Unexpected data structure", ApiErrorType.SERVER_ERROR);
        },
    });
};
