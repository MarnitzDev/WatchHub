import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "@/api/tmdb/movies";

export const useInfinitePopularMovies = () => {
    return useInfiniteQuery({
        queryKey: ["popularMovies"],
        queryFn: ({ pageParam = 1 }) => fetchPopularMovies(pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });
};