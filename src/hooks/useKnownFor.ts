import { useQuery } from "@tanstack/react-query";
import { fetchKnownForMovies, fetchKnownForSeries } from "@/api/tmdb";
import { IMovie } from "@/types/Movie";
import { ISeries } from "@/types/Series";

export const useKnownFor = (personId: number) => {
    const moviesQuery = useQuery<IMovie[], Error>({
        queryKey: ["knownForMovies", personId],
        queryFn: () => fetchKnownForMovies(personId),
    });

    const seriesQuery = useQuery<ISeries[], Error>({
        queryKey: ["knownForSeries", personId],
        queryFn: () => fetchKnownForSeries(personId),
    });

    return {
        movies: moviesQuery,
        series: seriesQuery,
    };
};
