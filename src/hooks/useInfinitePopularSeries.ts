import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularSeries } from "@/api/tmdb/series";

export const useInfinitePopularSeries = () => {
    return useInfiniteQuery({
        queryKey: ["popularSeries"],
        queryFn: ({ pageParam = 1 }) => fetchPopularSeries(pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });
};