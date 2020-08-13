export interface Movie {
    type: string;
    id: number;
    title: string;
    vote_average?: number;
    release_date?: Date;
    poster_path?: string;
    backdrop_path?: string;
}

export interface MovieDetail {
    type: string;
    id: number;
    title: string;
    vote_average?: number;
    release_date?: Date;
    poster_path?: string;
    backdrop_path?: string;
    overview?: string;
    video: boolean;
    homepage?: string;
    imdb_id: number;
}
