import { useQuery } from "@tanstack/react-query";
import {
    fetchSeriesDetails,
    fetchSeriesCredits,
    fetchSeriesVideos,
    fetchSeriesKeywords,
    fetchSeriesContentRatings,
} from "@/api/tmdb.ts";

export const useSeriesDetails = ({ seriesId }: { seriesId: number }) => {
    return useQuery({
        queryKey: ["seriesDetails", seriesId],
        queryFn: async () => {
            const [seriesDetails, credits, videos, keywords, contentRatings] = await Promise.all([
                fetchSeriesDetails(seriesId),
                fetchSeriesCredits(seriesId),
                fetchSeriesVideos(seriesId),
                fetchSeriesKeywords(seriesId),
                fetchSeriesContentRatings(seriesId),
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
    });
};
