import { useQuery } from "@tanstack/react-query";
import { fetchTMDBSeriesCredits } from "@/api/tmdb";

export const useSeriesCredits = (seriesId: number) => {
    return useQuery({
        queryKey: ["seriesCredits", seriesId],
        queryFn: () => fetchTMDBSeriesCredits(seriesId),
    });
};