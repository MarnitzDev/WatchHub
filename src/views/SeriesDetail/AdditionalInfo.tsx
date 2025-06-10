import React from "react";

interface AdditionalInfoProps {
    series: {
        first_air_date: string;
        last_air_date: string;
        number_of_seasons: number;
        number_of_episodes: number;
        episode_run_time: number[];
        in_production: boolean;
        status: string;
        type: string;
        networks: { id: number; name: string; logo_path: string }[];
        keywords?: { id: number; name: string }[];
    };
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ series }) => {
    const averageRuntime =
        series.episode_run_time.length > 0
            ? Math.round(
                  series.episode_run_time.reduce((a, b) => a + b) / series.episode_run_time.length
              )
            : 0;

    return (
        <div className="sticky top-16 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">First Air Date:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {new Date(series.first_air_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Last Air Date:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {new Date(series.last_air_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Seasons:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {series.number_of_seasons}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Episodes:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {series.number_of_episodes}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Status:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {series.status} {series.in_production ? "(In Production)" : ""}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold dark:text-gray-300">Type:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">{series.type}</span>
            </div>

            {/* Keywords */}
            {series.keywords && series.keywords.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {series.keywords.map((keyword) => (
                            <span
                                key={keyword.id}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
                            >
                                {keyword.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Networks */}
            {series.networks && series.networks.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Networks</h3>
                    <div className="flex flex-wrap gap-4">
                        {series.networks.map((network) => (
                            <div key={network.id} className="flex flex-col items-center">
                                {network.logo_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                                        alt={network.name}
                                        className="w-16 h-8 object-contain"
                                        title={network.name}
                                    />
                                ) : (
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{network.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdditionalInfo;
