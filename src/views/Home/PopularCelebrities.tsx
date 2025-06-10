import React from "react";
import { Link } from "react-router-dom";
import { usePopularPeople } from "@/hooks/usePopularPeople";
import ProgressiveImage from "@/components/ProgressiveImage";

const PopularCelebrities: React.FC = () => {
    const { data, isLoading, error } = usePopularPeople();

    if (isLoading) return <div>Loading celebrities...</div>;
    if (error) return <div>Error loading celebrities: {error.message}</div>;
    if (!data || !Array.isArray(data.results)) return <div>No celebrities data available</div>;

    const celebrities = data.results;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {celebrities.slice(0, 12).map((celebrity) => (
                <Link
                    to={`/person/${celebrity.id}`}
                    key={celebrity.id}
                    className="group text-center"
                >
                    <div className="aspect-square rounded-full overflow-hidden mx-auto mb-2 relative">
                        {celebrity.profile_path ? (
                            <ProgressiveImage
                                lowQualitySrc={`https://image.tmdb.org/t/p/w45${celebrity.profile_path}`}
                                highQualitySrc={`https://image.tmdb.org/t/p/w185${celebrity.profile_path}`}
                                alt={celebrity.name}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out rounded-full"></div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {celebrity.name}
                    </h3>
                </Link>
            ))}
        </div>
    );
};

export default PopularCelebrities;