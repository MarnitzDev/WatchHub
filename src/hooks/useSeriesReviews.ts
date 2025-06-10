import { useQuery } from '@tanstack/react-query';
import { fetchSeriesReviews } from '@/api/tmdb/series';

export const useSeriesReviews = (seriesId: number) => {
    return useQuery({
        queryKey: ['seriesReviews', seriesId],
        queryFn: () => fetchSeriesReviews(seriesId),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};