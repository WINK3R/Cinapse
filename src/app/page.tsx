"use client"
import styles from '@/app/ui/app.module.css';
import React, {Suspense, useEffect} from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import HeroButtonPrimary from "@/app/ui/components/HeroButtonPrimary";
import HeroButtonSecondary from "@/app/ui/components/HeroButtonSecondary";
import CollectionRow from "@/app/ui/components/CollectionRow";
import {
    getMostPopularMovie,
    getNowPlayingMovies,
    getPopularMovies, getTopRatedMovies,
    getTrendingMovies
} from "@/app/services/movieService";
import {ShowCaseCollection} from "@/app/ui/components/ShowCaseCollection";
import Movie from "@/app/classes/Movie";
import Image from "next/image";





export default function Page() {
    const [theMostPopularMovie, setTheMostPopularMovie] = React.useState<Movie | null>(null);

    useEffect(() => {
        getMostPopularMovie().then((movie) => {
            setTheMostPopularMovie(movie)
        })
    }, [])
    return (
        <div>

            <div className={styles.hero}>
                <div className={styles.heroVideo}>
                    {theMostPopularMovie?.backdropPath&&(
                        <Image src={theMostPopularMovie?.backdropPath} alt={"poster path"} priority={true} className={styles.heroImage} width={1920} height={1080}></Image>)}
                </div>
                <div className={styles.heroInfo}>
                    <h1 className={styles.heroTitle}>{theMostPopularMovie?.title}</h1>
                    <div className={styles.heroButtons}>
                        <HeroButtonPrimary>En savoir +</HeroButtonPrimary>
                        <HeroButtonSecondary>Enregistrer</HeroButtonSecondary>
                    </div>
                </div>
                <div className={styles.heroGradiant}></div>

            </div>
            <Suspense>
                <ShowCaseCollection title={"Tendances"} fetchFunction={getTrendingMovies}></ShowCaseCollection>
            </Suspense>
            <Suspense>
                <CollectionRow title={"Au cinéma"} fetchFunction={getNowPlayingMovies} ></CollectionRow>
            </Suspense>
            <Suspense>
                <ShowCaseCollection title={"Populaires"} fetchFunction={getPopularMovies}></ShowCaseCollection>
            </Suspense>
            <Suspense>
                <CollectionRow title={"Top Films"} fetchFunction={getTopRatedMovies} ></CollectionRow>
            </Suspense>
        </div>
    );
}
