import { useQuery } from "@tanstack/react-query";
import { fetchPopularPeople } from "@/api/tmdb";

export const usePopularPeople = () => {
    return useQuery({
        queryKey: ["popularPeople"],
        queryFn: () => fetchPopularPeople(),
    });
};