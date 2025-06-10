import React from 'react';
import { useSeriesReviews } from '@/hooks/useSeriesReviews';
import ProgressiveImage from '@/components/ProgressiveImage';

interface SeriesReviewsProps {
    seriesId: number;
}

const SeriesReviews: React.FC<SeriesReviewsProps> = ({ seriesId }) => {
    const { data: reviews, isLoading, error } = useSeriesReviews(seriesId);

    if (isLoading) return <div>Loading reviews...</div>;
    if (error) return <div>Error loading reviews: {error.message}</div>;
    if (!reviews || reviews.length === 0) return <div>No reviews available.</div>;

    return (
        <div className="space-y-6">
            {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                        <ProgressiveImage
                            lowQualitySrc={`https://secure.gravatar.com/avatar/${review.author_details.avatar_path}?s=45`}
                            highQualitySrc={`https://secure.gravatar.com/avatar/${review.author_details.avatar_path}?s=90`}
                            alt={review.author}
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <h3 className="font-bold">{review.author}</h3>
                            <p className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.content.slice(0, 300)}...</p>
                    <a
                        href={review.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                        Read full review
                    </a>
                </div>
            ))}
        </div>
    );
};

export default SeriesReviews;