export interface ISeries {
    id: number;
    name: string;
    original_name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_language: string;
    genre_ids: number[];
    origin_country: string[];
    character?: string;
    credit_id?: string;
    episode_count?: number;
}