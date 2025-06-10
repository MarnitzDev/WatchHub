
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import RecommendedSeries from "@/views/SeriesDetail/RecommendedSeries";
import TopCast from "@/views/SeriesDetail/TopCast";
import SeriesDetailContent from "@/views/SeriesDetail/SeriesDetailContent";
import AdditionalInfo from "@/views/SeriesDetail/AdditionalInfo";

const SeriesDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const seriesId = id ? parseInt(id, 10) : undefined;
    const { data: seriesData, isLoading, error } = useSeriesDetails({ seriesId });
    const { user } = useAuth();
    const { isFavourite, toggleFavourite } = useFavourite();
    const { isWatched, toggleWatched } = useWatched();

    const handleToggleFavourite = useCallback(() => {
        if (seriesData?.series) {
            toggleFavourite(seriesData.series);
        }
    }, [toggleFavourite, seriesData?.series]);

    const handleToggleWatched = useCallback(() => {
        if (seriesData?.series) {
            toggleWatched(seriesData.series);
        }
    }, [toggleWatched, seriesData?.series]);

    if (isLoading) return <div>Loading...</div>;
    if (error || !seriesData) return <div>Error loading series details</div>;

    const { series, credits, videos } = seriesData;
    const creators = series.created_by || [];
    const topCast = credits.cast.slice(0, 18);
    const trailer = videos.find((video) => video.type === "Trailer");

    const backdropPath = series.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${series.backdrop_path}`
        : null;
    const lowQualityBackdropPath = series.backdrop_path
        ? `https://image.tmdb.org/t/p/w300${series.backdrop_path}`
        : null;
    const posterSrc = series.poster_path
        ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
        : null;
    const lowQualityPosterSrc = series.poster_path
        ? `https://image.tmdb.org/t/p/w92${series.poster_path}`
        : null;

    return (
        <div>
            <SeriesDetailContent
                series={series}
                backdropPath={backdropPath}
                lowQualityBackdropPath={lowQualityBackdropPath}
                posterSrc={posterSrc}
                lowQualityPosterSrc={lowQualityPosterSrc}
                creators={creators}
                isAuthenticated={!!user}
                isFavourite={isFavourite(series.id)}
                handleToggleFavourite={handleToggleFavourite}
                isWatched={isWatched(series.id)}
                handleToggleWatched={handleToggleWatched}
                trailerKey={trailer?.key}
            />

            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-2/3 md:pr-8">
                        <div className="mt-8">
                            <TopCast cast={topCast} seriesId={series.id} />
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                            <RecommendedSeries seriesId={series.id} />
                        </div>

                        {/*<div className="mt-8">*/}
                        {/*    <h2 className="text-2xl font-bold mb-4">User Reviews</h2>*/}
                        {/*    <SeriesReviews seriesId={series.id} />*/}
                        {/*</div>*/}
                    </div>

                    {/* Right Side */}
                    <div className="md:w-1/3 mt-8">
                        <AdditionalInfo series={series} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeriesDetailPage;