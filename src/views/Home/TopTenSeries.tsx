import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularSeries } from "@/api/tmdb";
import SeriesCard from "@/components/SeriesCard";
import { ISeries } from "@/types/Series";

const TopTenSeries: React.FC = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["topTenSeries"],
        queryFn: () => fetchPopularSeries(1),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading top series</div>;

    const topTen = data?.results.slice(0, 10) || [];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topTen.map((series: ISeries) => (
                <SeriesCard key={series.id} series={series} />
            ))}
        </div>
    );
};

export default TopTenSeries;
