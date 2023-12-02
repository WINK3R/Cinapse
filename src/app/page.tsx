"use client"
import styles from '@/app/ui/app.module.css';
import HeroButtonPrimary from "@/app/ui/components/HeroButtonPrimary";
import HeroButtonSecondary from "@/app/ui/components/HeroButtonSecondary";
import React from "react";
import CollectionRow from "@/app/ui/components/CollectionRow";
import {
    getMostPopularMovie, getMovieById,
    getNowPlayingMovies,
    getPopularMovies,
    getUpComingMovies
} from "@/app/services/movieService";
import Movie from '@/app/classes/Movie';
import ShowCaseCollection from "@/app/ui/components/ShowCaseCollection";
import { use } from "react";
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
    const theMostPopularMovie: Movie | null = use(fetchDataMostPopular())
    const showCaseMovie: Movie | null = use(fetchDatashowCaseMovie(theMostPopularMovie!.id))
    const popularMovies: Movie[] = use(fetchDataPopular())
    const nowPlayingMovies: Movie[] = use(fetchDataNowPlaying())
    const upcomingMovies: Movie[] = use(fetchDataUpComing())


    return (
        <div>
            <div className={styles.hero}>
                <div className={styles.heroVideo}>
                    <Image src={theMostPopularMovie?.backdropPath!} alt={"poster path"} priority={true} className={styles.heroImage} width={1920} height={1080}></Image>
                </div>
                <div className={styles.heroInfo}>
                    <h1 className={styles.heroTitle}>{showCaseMovie?.title}</h1>
                    <div className={styles.heroButtons}>
                        <HeroButtonPrimary>En savoir +</HeroButtonPrimary>
                        <HeroButtonSecondary>Enregistrer</HeroButtonSecondary>
                    </div>
                </div>
                <div className={styles.heroGradiant}></div>
            </div>
            <ShowCaseCollection title={"Nouveautés"} movies={upcomingMovies}></ShowCaseCollection>
            <CollectionRow title={"Tendances"} movies={popularMovies} type={"Popular"}></CollectionRow>
            <CollectionRow title={"Au cinéma"} movies={nowPlayingMovies} type={"NowPlaying"}></CollectionRow>

        </div>
    );
}