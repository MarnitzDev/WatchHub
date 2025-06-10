import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedSeries } from "@/api/tmdb";
import { ISeries } from "@/types/Series";

export const useRecommendedSeries = (seriesId: number) => {
    return useQuery<ISeries[]>({
        queryKey: ["recommendedSeries", seriesId],
        queryFn: async () => {
            const data = await fetchRecommendedSeries(seriesId);
            return data.results.slice(0, 10); // Return only the first 10 recommendations
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
