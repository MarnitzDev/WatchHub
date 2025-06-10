import { useQuery } from "@tanstack/react-query";
import { fetchPersonDetails } from "@/api/tmdb";

/**
 * Fetches person details from TMDB using React Query.
 *
 * @param personId - The TMDB person ID.
 * @returns Query result object with data, loading state, and error.
 *
 */
export const usePersonDetails = (personId: number) => {
    return useQuery({
        queryKey: ["personDetails", personId],
        queryFn: () => fetchPersonDetails(personId),
        enabled: !!personId,
    });
};
