
import React from "react";
import { useKnownFor } from "@/hooks/useKnownFor";
import { ISeries } from "@/types/Series";
import SeriesCard from "@/components/SeriesCard";

interface KnownForSeriesProps {
    personId: number;
}

const KnownForSeries: React.FC<KnownForSeriesProps> = ({ personId }) => {
    const { series } = useKnownFor(personId);

    if (series.isLoading) return <div>Loading series...</div>;
    if (series.error) return <div>Error loading series: {series.error.message}</div>;
    if (!series.data || series.data.length === 0) return <div>No known series found.</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Known For TV Series</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {series.data.map((show: ISeries) => (
                    <SeriesCard key={show.id} series={show} isAuthenticated={false} />
                ))}
            </div>
        </div>
    );
};

export default KnownForSeries;