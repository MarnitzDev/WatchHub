
import { useQuery } from "@tanstack/react-query";
import {
    fetchTMDBSeriesDetails,
    fetchTMDBSeriesCredits,
    fetchTMDBSeriesVideos,
    fetchTMDBSeriesKeywords,
    fetchTMDBSeriesContentRatings,
} from "@/api/tmdb.ts";

export const useSeriesDetails = ({ seriesId }: { seriesId: number }) => {
    return useQuery({
        queryKey: ["seriesDetails", seriesId],
        queryFn: async () => {
            const [seriesDetails, credits, videos, keywords, contentRatings] =
                await Promise.all([
                    fetchTMDBSeriesDetails(seriesId),
                    fetchTMDBSeriesCredits(seriesId),
                    fetchTMDBSeriesVideos(seriesId),
                    fetchTMDBSeriesKeywords(seriesId),
                    fetchTMDBSeriesContentRatings(seriesId),
                ]);

            // Type assertions for all variables
            const typedSeriesDetails = seriesDetails as any;
            const typedCredits = credits as { cast: any[]; crew: any[] };
            const typedVideos = videos as { results: any[] };
            const typedKeywords = keywords as { results: { id: number; name: string }[] };
            const typedContentRatings = contentRatings as { results: any[] };

            return {
                series: {
                    ...typedSeriesDetails,
                    keywords: typedKeywords.results.slice(0, 10),
                    content_ratings: typedContentRatings.results,
                },
                credits: {
                    cast: typedCredits.cast.slice(0, 18),
                    crew: typedCredits.crew,
                },
                videos: typedVideos.results,
            };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
    });
};