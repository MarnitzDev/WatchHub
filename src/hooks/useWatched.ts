import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IMovie } from "@/types/Movie";

interface IWatched {
    movie_id: number;
    title: string;
    poster_path: string;
}

export const useWatched = () => {
    const { user, isAuthenticated } = useAuth0();
    const [watched, setWatched] = useState<IWatched[]>([]);

    const isWatched = useCallback(
        (movieId: number) => {
            return watched.some((item) => item.movie_id === movieId);
        },
        [watched]
    );

    const toggleWatched = useCallback(
        (movie: IMovie) => {
            if (!isAuthenticated) return;

            setWatched((prev) => {
                const existingIndex = prev.findIndex((item) => item.movie_id === movie.id);
                if (existingIndex !== -1) {
                    // Remove the movie if it's already in the watched list
                    return prev.filter((item) => item.movie_id !== movie.id);
                } else {
                    // Add the movie to the watched list
                    return [...prev, {
                        movie_id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path
                    }];
                }
            });
        },
        [isAuthenticated]
    );

    return {
        watched,
        isLoading: false,
        toggleWatched,
        isWatched
    };
};