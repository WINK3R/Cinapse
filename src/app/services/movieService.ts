import Movie from "@/app/classes/Movie";
import {APIKEY, BASEURL} from "../../../values/constants";


async function makeRequest<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url, {
            next: { revalidate: 0},
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
    const url = `${BASEURL}/movie/popular?language=en-US&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getNowPlayingMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/movie/now_playing?language=en-US&page=${page}`;

    try {
        const { results } = await makeRequest<{ results: any[] }>(url);
        return results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

export async function getUpComingMovies(page: number = 1): Promise<Movie[]> {
    const url = `${BASEURL}/movie/upcoming?language=en-US&page=${page}`;

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
        const popularMovies = await getPopularMovies(1);

        // Return the first movie as the most popular
        return popularMovies.length > 0 ? popularMovies[0] : null;
    } catch (error) {
        console.error('Error fetching most popular movie:', error);
        return null;
    }
}

// Function to get the video URL for a given movie ID
export async function getVideoUrl(movieId: number): Promise<string | null> {
    const url = `${BASEURL}/movie/${movieId}/videos`;

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
    const url = `${BASEURL}/movie/${movieId}?language=en-US`;

    try {
        const movieData = await makeRequest<{ id: number; [key: string]: any }>(url);

        // Return a new Movie instance with the retrieved data
        return new Movie(movieData);
    } catch (error) {
        console.error(`Error fetching movie by ID ${movieId}:`, error);
        return null;
    }
}


