import {ImageMapper} from "@/app/mappers/imageMapper";

class WatchProvider {
    logoPath: string | null
    providerId: number;
    providerName: string;
    displayPriority: number;

    constructor(data: any) {
        this.logoPath = ImageMapper(data.logo_path);
        this.providerId = data.provider_id;
        this.providerName = data.provider_name;
        this.displayPriority = data.display_priority;
    }
}

export default WatchProvider;