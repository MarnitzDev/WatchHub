import React from "react";
import { useRecommendedSeries } from "@/hooks/useRecommendedSeries";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import SeriesCard from "@/components/SeriesCard";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { ISeries } from "@/types/Series";

interface RecommendedSeriesProps {
    seriesId: number;
}

const RecommendedSeries: React.FC<RecommendedSeriesProps> = ({ seriesId }) => {
    const {
        data: recommendedSeries,
        isLoading: isLoadingRecommendations,
        error: recommendationsError,
    } = useRecommendedSeries(seriesId);
    const {
        data: seriesDetails,
        isLoading: isLoadingDetails,
        error: detailsError,
    } = useSeriesDetails({ seriesId });
    const { user } = useAuth();
    const { toggleFavourite } = useFavourite();

    if (isLoadingRecommendations || isLoadingDetails) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                    ></div>
                ))}
            </div>
        );
    }

    if (recommendationsError || detailsError) {
        return (
            <div>
                {recommendationsError && (
                    <p>Error loading recommendations: {recommendationsError.message}</p>
                )}
                {detailsError && <p>Error loading series details: {detailsError.message}</p>}
            </div>
        );
    }

    if (!recommendedSeries || recommendedSeries.length === 0 || !seriesDetails) {
        return <div>No recommendations available</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recommendedSeries.slice(0, 8).map((series: ISeries) => (
                    <SeriesCard
                        key={series.id}
                        series={series}
                        isAuthenticated={!!user}
                        onToggleFavourite={() => toggleFavourite(series)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedSeries;
