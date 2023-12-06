import {ImageMapper} from "@/app/mappers/imageMapper";

export class ImageMovie {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string | null
    vote_average: number;
    vote_count: number;
    width: number;

    constructor(data: any) {
        this.aspect_ratio = data.aspect_ratio;
        this.height = data.height;
        this.iso_639_1 = data.iso_639_1;
        this.file_path = ImageMapper(data.file_path);
        this.vote_average = data.vote_average;
        this.vote_count = data.vote_count;
        this.width = data.width;
    }
}