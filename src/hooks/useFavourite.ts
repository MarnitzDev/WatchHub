import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IMovie } from "@/types/Movie";

export const useFavourite = () => {
    const { user } = useAuth0();
    const [favourites, setFavourites] = useState<number[]>([]);

    const toggleFavourite = useCallback(
        (movie: IMovie) => {
            if (!user) return;

            setFavourites((prev) =>
                prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
            );
        },
        [user]
    );

    const isFavourite = useCallback(
        (movieId: number) => {
            return favourites.includes(movieId);
        },
        [favourites]
    );

    return {
        favourites,
        toggleFavourite,
        isFavourite,
        isLoading: false,
    };
};
