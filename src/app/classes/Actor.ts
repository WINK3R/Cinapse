import {ImageMapper} from "@/app/mappers/imageMapper";

export default class Actor {
    public id: number;
    public name: string;
    public character: string;
    public profilePath: string | null;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.character = data.character;
        this.profilePath = ImageMapper(data.profile_path);
    }


}
