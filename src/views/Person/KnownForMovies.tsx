import React from "react";
import MovieCard from "@/components/MovieCard";
import { useKnownFor } from "@/hooks/useKnownFor";
import { IMovie } from "@/types/Movie";

interface KnownForMoviesProps {
    personId: number;
}

const KnownForMovies: React.FC<KnownForMoviesProps> = ({ personId }) => {
    const { movies } = useKnownFor(personId);

    if (movies.isLoading) return <div>Loading known movies...</div>;
    if (movies.error) return <div>Error loading movies: {movies.error.message}</div>;
    if (!movies.data || movies.data.length === 0) return <div>No known movies available</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Known For Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movies.data.map((movie: IMovie) => (
                    <MovieCard key={movie.id} movie={movie} isAuthenticated={false} />
                ))}
            </div>
        </div>
    );
};

export default KnownForMovies;
