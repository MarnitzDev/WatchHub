import React from "react";
import { useFavourite } from "@/hooks/useFavourite";
import { useAuth } from "@/hooks/useAuth";
import { ISeries } from "@/types/Series";
import SeriesCard from "@/components/SeriesCard";
import { useInfinitePopularSeries } from "@/hooks/useInfinitePopularSeries";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useInView } from "react-intersection-observer";

const SeriesPage: React.FC = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
        useInfinitePopularSeries();
    const { toggleFavourite, isFavourite } = useFavourite();
    const { isAuthenticated } = useAuth();
    const { ref, inView } = useInView();

    React.useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    const handleToggleFavourite = (series: ISeries) => {
        toggleFavourite(series);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 relative inline-block">
                    Discover Series
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(18)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex-1 px-4">
                <h2 className="text-2xl font-bold mb-6 relative inline-block">
                    Popular Series
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {data?.pages.map((page) =>
                        page.results.map((seriesItem: ISeries) => (
                            <SeriesCard
                                key={seriesItem.id}
                                series={seriesItem}
                                IsFavourite={isFavourite(seriesItem.id)}
                                onToggleFavourite={() => handleToggleFavourite(seriesItem)}
                                isAuthenticated={isAuthenticated}
                            />
                        ))
                    )}
                </div>
                {isFetchingNextPage && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
                        {[...Array(6)].map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                )}
                <div ref={ref} className="h-10 mt-4"></div>
            </div>
        </div>
    );
};

export default SeriesPage;
