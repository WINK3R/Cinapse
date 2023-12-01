// Movie.ts
import {ImageMapper} from "@/app/mappers/imageMapper";

class Movie {
    adult: boolean;
    backdropPath: string | null;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;

    constructor(data: any) {
        this.adult = data.adult;
        this.backdropPath = ImageMapper(data.backdrop_path);
        this.genreIds = data.genre_ids;
        this.id = data.id;
        this.originalLanguage = data.original_language;
        this.originalTitle = data.original_title;
        this.overview = data.overview;
        this.popularity = data.popularity;
        this.posterPath = ImageMapper(data.poster_path);
        this.releaseDate = data.release_date;
        this.title = data.title;
        this.video = data.video;
        this.voteAverage = data.vote_average;
        this.voteCount = data.vote_count;
    }
}

export default Movie;
