import React from "react";
import { useSeriesReviews } from "@/hooks/useSeriesReviews";
import { IReview } from "@/types/Review";

interface SeriesReviewsProps {
    seriesId: number;
}

const SeriesReviews: React.FC<SeriesReviewsProps> = ({ seriesId }) => {
    const { data: reviews, isLoading, error } = useSeriesReviews(seriesId);

    if (isLoading) return <div>Loading reviews...</div>;
    if (error) return <div>Error loading reviews: {error.message}</div>;

    return (
        <div className="mt-8">
            {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review: IReview) => (
                        <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-bold">{review.author}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-sm">
                                {review.content.length > 300
                                    ? `${review.content.substring(0, 300)}...`
                                    : review.content}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available for this series.</p>
            )}
        </div>
    );
};

export default SeriesReviews;
