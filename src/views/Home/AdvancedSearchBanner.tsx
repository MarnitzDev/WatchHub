import React from "react";
import { Link } from "react-router-dom";

const AdvancedSearchBanner: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4">Advanced Search</h2>
            <p className="mb-6 max-w-md">
                Find exactly what you're looking for with our powerful search tools.
            </p>
            <Link
                to="/search"
                className="bg-white dark:bg-gray-800 text-purple-600 dark:text-text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 inline-block"
            >
                Try Advanced Search
            </Link>
        </div>
    );
};

export default AdvancedSearchBanner;
