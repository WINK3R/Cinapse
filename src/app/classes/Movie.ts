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
    releaseDate: Date;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    type: string;

    constructor(data: any) {
        this.adult = data.adult;
        this.backdropPath = ImageMapper(data.backdrop_path);
        this.genreIds = data.genre_ids;
        this.id = data.id;
        this.originalLanguage = data.original_language;
        this.originalTitle = data.original_title || data.original_name;
        this.overview = data.overview;
        this.popularity = data.popularity;
        this.posterPath = ImageMapper(data.poster_path);
        this.releaseDate = new Date(data.release_date || data.first_air_date);
        this.title = data.title || data.name;
        this.video = data.video || false;
        this.voteAverage = data.vote_average;
        this.voteCount = data.vote_count;
        this.type = data.original_title ? 'movie' : 'serie';
        console.log(this);
    }
}

export default Movie;
