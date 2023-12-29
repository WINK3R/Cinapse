import Movie from "@/app/classes/Movie";
import {APIKEY, BASEURL} from "../../../values/constants";
import WatchProvider from "@/app/classes/WatchProvider";
import {ImageMovie} from "@/app/classes/ImageMovie";
import Actor from "@/app/classes/Actor";


async function makeRequest<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${APIKEY}`,
                Accept: 'application/json',
            },
        });
        return await response.json();
    } catch (error : any) {
        throw new Error(`Error making API request: ${error.message}`);
    }
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/movie/popular?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getNowPlayingMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/movie/now_playing?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getTrendingMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/trending/movie/day?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getTrending(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/trending/all/day?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getTopRatedMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/movie/top_rated?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getTopRatedSeries(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/tv/top_rated?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getMostPopularMovie(): Promise<Movie | null> {
    try {
        const popularMovies = await getTrendingMovies(1);

        // Return the first movie as the most popular
        return popularMovies.length > 0 ? popularMovies[0] : null;
    } catch (error) {
        console.error('Error fetching most popular movie:', error);
        return null;
    }
}

export async function getSimilarMovie( movie: Movie): Promise<Movie[]> {
    let url
    if(movie.type === 'movie') {
        url = `${BASEURL}/movie/${movie.id}/similar?language=fr-FR&page=1`;
    }
    else{
        url = `${BASEURL}/tv/${movie.id}/similar?language=fr-FR&page=1`;
    }
    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        console.log(results);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

// Function to get the video URL for a given movie ID
export async function getVideoUrl(movieId: number): Promise<string | null> {
    const url = `${BASEURL}/${movieId}/videos`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);

        // Find the first YouTube video
        const youtubeVideo = results.find(video => video.site === 'YouTube' && video.type === 'Teaser');

        // Return the YouTube video key as the URL
        return youtubeVideo ? youtubeVideo.key : null;
    } catch (error) {
        console.error(`Error fetching video URL for movie ${movieId}:`, error);
        return null;
    }
}

export async function getMovieById(movieId: number): Promise<Movie | null> {
    const url = `${BASEURL}/${movieId}?language=fr-FR`;

    try {
        const movieData = await makeRequest<{ id: number; [key: string]: any }>(url);

        // Return a new Movie instance with the retrieved data
        return new Movie(movieData);
    } catch (error) {
        console.error(`Error fetching movie by ID ${movieId}:`, error);
        return null;
    }
}

export async function getWatchProvidersSerie(seriesId: number): Promise<WatchProvider[]> {

    const url = `${BASEURL}/tv/${seriesId}/watch/providers`;

    try {
        const { results } = await makeRequest<{ results: any }>(url);
        // Assuming your WatchProvider class has a constructor that takes provider data
        return results ? results[Object.keys(results)[0]].flatrate.map((providerData: any) => new WatchProvider(providerData)) : [];
    } catch (error) {
        console.error('Error fetching watch providers:', error);
        return [];
    }
}

export async function getWatchProvidersMovie(movieId: number): Promise<WatchProvider[]> {
    const url = `${BASEURL}/movie/${movieId}/watch/providers`;

    // Specify the regions you want to include
    const targetRegions = ['FR', 'US'];

    try {
        const { results } = await makeRequest<{ results: any }>(url);
        if (results) {
            const providers: WatchProvider[] = [];

            // Create a Set to keep track of unique provider IDs
            const uniqueProviderIds = new Set<number>();

            // Iterate over the specified regions
            targetRegions.forEach((region) => {
                // Check if the region exists in the results
                if (results[region]) {
                    // Iterate over flatrate providers in each region
                    if (results[region].flatrate) {
                        results[region].flatrate.forEach((providerData: any) => {
                            const providerId = providerData.provider_id;

                            // Check if the provider ID is unique
                            if (!uniqueProviderIds.has(providerId)) {
                                uniqueProviderIds.add(providerId);

                                // Create a WatchProvider instance and add it to the array
                                providers.push(new WatchProvider(providerData));
                            }
                        });
                    }

                    // Iterate over rent providers in each region
                    if (results[region].rent) {
                        results[region].rent.forEach((providerData: any) => {
                            const providerId = providerData.provider_id;

                            // Check if the provider ID is unique
                            if (!uniqueProviderIds.has(providerId)) {
                                uniqueProviderIds.add(providerId);

                                // Create a WatchProvider instance and add it to the array
                                providers.push(new WatchProvider(providerData));
                            }
                        });
                    }

                    // Iterate over buy providers in each region
                    if (results[region].buy) {
                        results[region].buy.forEach((providerData: any) => {
                            const providerId = providerData.provider_id;

                            // Check if the provider ID is unique
                            if (!uniqueProviderIds.has(providerId)) {
                                uniqueProviderIds.add(providerId);

                                // Create a WatchProvider instance and add it to the array
                                providers.push(new WatchProvider(providerData));
                            }
                        });
                    }
                }
            });

            return providers;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching watch providers for movie:', error);
        return [];
    }
}



export async function getNowPlayingSeries(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/tv/on_the_air?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getPopularSeries(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/tv/popular?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getTrendingSeries(page: number = 1) {
    const url = `${BASEURL}/trending/tv/day?language=fr-FR&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getMovieImagesMovies(movieId: number): Promise<ImageMovie[]> {
    const url = `${BASEURL}/movie/${movieId}/images`;

    try {
        const response = await makeRequest<{ backdrops?: any[] }>(url);

        // Check if the 'backdrops' property exists and is an array
        const backdrops = response?.backdrops;

        if (Array.isArray(backdrops)) {
            // Map the array to an array of ImageMovie instances
            return backdrops.slice(0, 10).map(backdrop => new ImageMovie(backdrop));
        } else {
            console.error(`Invalid or missing 'backdrops' property in the response for movie ${movieId}`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching movie images for movie ${movieId}:`, error);
        return [];
    }
}
export async function getMovieImagesSeries(movieId: number): Promise<ImageMovie[]> {
    const url = `${BASEURL}/tv/${movieId}/images`;

    try {
        const response = await makeRequest<{ backdrops?: any[] }>(url);

        // Check if the 'backdrops' property exists and is an array
        const backdrops = response?.backdrops;

        if (Array.isArray(backdrops)) {
            // Map the array to an array of ImageMovie instances
            const imageMovies = backdrops.slice(0,10).map(backdrop => new ImageMovie(backdrop));
            return imageMovies;
        } else {
            console.error(`Invalid or missing 'backdrops' property in the response for movie ${movieId}`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching movie images for movie ${movieId}:`, error);
        return [];
    }
}

export async function getActors(movie: Movie): Promise<Actor[]> {
    let url;
    if(movie.type === 'movie') {
         url = `${BASEURL}/movie/${movie.id}/credits`;
    }
    else {
         url = `${BASEURL}/tv/${movie.id}/credits`;
    }

    try {
        const { cast } = await makeRequest<{ cast: any[] }>(url);

        if (Array.isArray(cast)) {
            return cast.slice(0,20).map(actorData => new Actor(actorData));
        } else {
            console.error(`Invalid or missing 'cast' property in the response for series ${movie.id}`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching actors for series ${movie.id}:`, error);
        return [];
    }
}
