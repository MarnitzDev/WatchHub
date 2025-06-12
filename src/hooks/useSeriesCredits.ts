import { useQuery } from "@tanstack/react-query";
import { fetchSeriesCredits } from "@/api/tmdb";

export const useSeriesCredits = (seriesId: number) => {
    return useQuery({
        queryKey: ["seriesCredits", seriesId],
        queryFn: () => fetchSeriesCredits(seriesId),
    });
};
