

export function ImageMapper(image: string): string |null{
    if(image === null){
        return null
    }
    return `https://image.tmdb.org/t/p/original/${image}`
}