import { ISearchCriteria } from "@/types/SearchCriteria";
import { useQuery } from "@tanstack/react-query";
import { IMovie } from "@/types/Movie";
import { fetchAdvancedSearchMovies } from "@/api/tmdb";

export const useAdvancedSearchMovies = (
    searchCriteria: ISearchCriteria,
    isSearchClicked: boolean
) => {
    return useQuery<IMovie[]>({
        queryKey: ["advancedSearchMovies", searchCriteria],
        queryFn: () => fetchAdvancedSearchMovies(searchCriteria),
        enabled: isSearchClicked,
    });
};
