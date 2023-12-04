enum SerieGenre {
    ActionAdventure = 10759,
    Animation = 16,
    Comedy = 35,
    Crime = 80,
    Documentary = 99,
    Drama = 18,
    Family = 10751,
    Kids = 10762,
    Mystery = 9648,
    News = 10763,
    Reality = 10764,
    ScienceFictionFantasy = 10765,
    Soap = 10766,
    Talk = 10767,
    WarPolitics = 10768,
    Western = 37,
}
type MovieGenreString = keyof typeof SerieGenre;

export function getGenreNameByIdSerie(id: number): string | undefined {
    return Object.keys(SerieGenre).find(
        (key) => SerieGenre[key as MovieGenreString] === id
    );
}