"use client"
import styles from '@/app/ui/app.module.css';
import HeroButtonPrimary from "@/app/ui/components/HeroButtonPrimary";
import HeroButtonSecondary from "@/app/ui/components/HeroButtonSecondary";
import React, {useEffect, useState} from "react";
import CollectionRow from "@/app/ui/components/CollectionRow";
import {
    getMostPopularMovie, getMovieById,
    getNowPlayingMovies,
    getPopularMovies,
    getUpComingMovies
} from "@/app/services/movieService";
import Movie from '@/app/classes/Movie';
import ShowCaseCollection from "@/app/ui/components/ShowCaseCollection";
import Image from "next/image";


async function fetchDataMostPopular() {
    return await getMostPopularMovie();
}
async function fetchDatashowCaseMovie(id: number) {
    return await getMovieById(id);
}
async function fetchDataPopular() {
    return await getPopularMovies();
}
async function fetchDataNowPlaying() {
    return await getNowPlayingMovies()
}

async function fetchDataUpComing() {
    return await getUpComingMovies()
}



export default function Page() {
    const [theMostPopularMovie, setTheMostPopularMovie] = useState<Movie | null>(null);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const mostPopularMovieData = await fetchDataMostPopular();
                setTheMostPopularMovie(mostPopularMovieData);

                if (mostPopularMovieData) {
                    const showcaseMovieData = await fetchDatashowCaseMovie(mostPopularMovieData.id);
                    setShowCaseMovie(showcaseMovieData);
                }

                const popularMoviesData = await fetchDataPopular();
                setPopularMovies(popularMoviesData);

                const nowPlayingMoviesData = await fetchDataNowPlaying();
                setNowPlayingMovies(nowPlayingMoviesData);

                const upcomingMoviesData = await fetchDataUpComing();
                setUpcomingMovies(upcomingMoviesData);
                console.log(upcomingMoviesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);



    return (
        <div>

            <div className={styles.hero}>
                <div className={styles.heroVideo}>
                    <Image src={theMostPopularMovie?.backdropPath!} alt={"poster path"} priority={true} className={styles.heroImage} width={1920} height={1080}></Image>
                </div>
                <div className={styles.heroInfo}>
                    <div className={styles.heroButtons}>
                        <HeroButtonPrimary>En savoir +</HeroButtonPrimary>
                        <HeroButtonSecondary>Enregistrer</HeroButtonSecondary>
                    </div>
                </div>
                <div className={styles.heroGradiant}></div>

            </div>
            {upcomingMovies.length >0 &&(<ShowCaseCollection title={"Nouveautés"} movies={upcomingMovies}></ShowCaseCollection>)}
            {popularMovies.length >0 &&(<CollectionRow title={"Tendances"} movies={popularMovies} type={"Popular"}></CollectionRow>)}
            {nowPlayingMovies.length >0 &&(<CollectionRow title={"Au cinéma"} movies={nowPlayingMovies} type={"NowPlaying"}></CollectionRow>)}

        </div>
    );
}