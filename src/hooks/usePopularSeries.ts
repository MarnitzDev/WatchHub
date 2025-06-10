import { ISeries } from "@/types/Series.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularSeries, fetchSeriesDetails } from "@/api/tmdb";

export const usePopularSeries = (page = 1) => {
    return useQuery({
        queryKey: ["popularSeries", page],
        queryFn: async () => {
            interface TMDBResponse {
                results: ISeries[];
            }

            const tmdbData = (await fetchPopularSeries(page)) as TMDBResponse;

            // Fetch detailed information (including genres) for each series
            return await Promise.all(
                tmdbData.results.map(async (series: ISeries) => {
                    const detailData = (await fetchSeriesDetails(series.id)) as {
                        genres: any[];
                    };
                    return {
                        ...series,
                        genres: detailData.genres,
                    };
                })
            );
        },
    });
};
