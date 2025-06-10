import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "@/api/tmdb";

export const useTrendingMovies = (timeWindow: "day" | "week" = "week") => {
    return useQuery({
        queryKey: ["trendingMovies", timeWindow],
        queryFn: () => fetchTrendingMovies(timeWindow),
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};
