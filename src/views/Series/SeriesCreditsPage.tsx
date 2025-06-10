import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSeriesCredits } from "@/hooks/useSeriesCredits";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import ProgressiveImage from "@/components/ProgressiveImage";

const SeriesCreditsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [seriesId, setSeriesId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"cast" | "crew">("cast");

    useEffect(() => {
        const stateSeriesId = location.state?.seriesId;
        const paramSeriesId = id ? parseInt(id, 10) : null;
        setSeriesId(stateSeriesId || paramSeriesId);
    }, [id, location.state]);

    const { data: seriesDetails, isLoading: isLoadingDetails } = useSeriesDetails({ seriesId: seriesId ?? 0 });
    const { data: credits, isLoading: isLoadingCredits } = useSeriesCredits(seriesId ?? 0);

    if (!seriesId || isLoadingDetails || isLoadingCredits) {
        return <div>Loading...</div>;
    }

    if (!seriesDetails || !credits) {
        return <div>Error: Unable to load series data</div>;
    }

    const { name, poster_path, first_air_date } = seriesDetails.series;
    const { cast = [], crew = [] } = credits;

    const departments = Array.from(new Set(crew.map((c) => c.department))).sort();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Series Header */}
            <div className="flex items-center mb-8">
                <ProgressiveImage
                    lowQualitySrc={`https://image.tmdb.org/t/p/w92${poster_path}`}
                    highQualitySrc={`https://image.tmdb.org/t/p/w342${poster_path}`}
                    alt={name || "Series poster"}
                    className="w-32 h-48 object-cover rounded mr-6"
                />
                <div>
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-gray-600">
                        {first_air_date ? new Date(first_air_date).getFullYear() : "N/A"}
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>

            <div className="mb-6">
                <button
                    className={`mr-4 px-4 py-2 rounded ${activeTab === "cast" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("cast")}
                >
                    Cast ({cast.length})
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "crew" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("crew")}
                >
                    Crew ({crew.length})
                </button>
            </div>

            {activeTab === "cast" && (
                <table className="w-full">
                    <thead>
                    <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Character</th>
                        <th className="text-left py-2">Episodes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cast.map((person) => (
                        <tr key={person.id} className="border-b">
                            <td className="py-4 pr-4">
                                <Link to={`/person/${person.id}`} className="flex items-center">
                                    {person.profile_path ? (
                                        <ProgressiveImage
                                            lowQualitySrc={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
                                            highQualitySrc={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                            alt={person.name}
                                            className="w-16 h-24 object-cover rounded mr-4"
                                        />
                                    ) : (
                                        <div className="w-16 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center">
                                                <span className="text-gray-400 text-center">
                                                    No Image
                                                </span>
                                        </div>
                                    )}
                                    <span className="font-semibold">{person.name}</span>
                                </Link>
                            </td>
                            <td className="py-4">{person.roles[0]?.character || 'N/A'}</td>
                            <td className="py-4">{person.total_episode_count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {activeTab === "crew" &&
                departments.map((dept) => (
                    <div key={dept} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{dept}</h2>
                        <table className="w-full">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Name</th>
                                <th className="text-left py-2">Job</th>
                                <th className="text-left py-2">Episodes</th>
                            </tr>
                            </thead>
                            <tbody>
                            {crew
                                .filter((c) => c.department === dept)
                                .map((person) => (
                                    <tr key={person.id} className="border-b">
                                        <td className="py-4 pr-4">
                                            <Link
                                                to={`/person/${person.id}`}
                                                className="flex items-center"
                                            >
                                                {person.profile_path ? (
                                                    <ProgressiveImage
                                                        lowQualitySrc={`https://image.tmdb.org/t/p/w45${person.profile_path}`}
                                                        highQualitySrc={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                                        alt={person.name}
                                                        className="w-16 h-24 object-cover rounded mr-4"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center">
                                                            <span className="text-gray-400 text-center">
                                                                No Image
                                                            </span>
                                                    </div>
                                                )}
                                                <span className="font-semibold">
                                                        {person.name}
                                                    </span>
                                            </Link>
                                        </td>
                                        <td className="py-4">{person.jobs[0]?.job || 'N/A'}</td>
                                        <td className="py-4">{person.total_episode_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
        </div>
    );
};

export default SeriesCreditsPage;