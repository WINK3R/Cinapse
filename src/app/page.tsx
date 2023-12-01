"use client";
import styles from '@/app/ui/app.module.css';
import HeroButtonPrimary from "@/app/ui/components/HeroButtonPrimary";
import HeroButtonSecondary from "@/app/ui/components/HeroButtonSecondary";
import React from "react";
import CollectionRow from "@/app/ui/components/CollectionRow";
import {
    getMostPopularMovie, getMovieById,
    getNowPlayingMovies,
    getPopularMovies,
    getUpComingMovies, getVideoUrl
} from "@/app/services/movieService";
import Movie from '@/app/classes/Movie';
import YouTube from 'react-youtube';
import ShowCaseCollection from "@/app/ui/components/ShowCaseCollection";

export default async function Page() {
    const theMostPopularMovie: Movie | null = await getMostPopularMovie()
    const showCaseMovie: Movie | null = await getMovieById(theMostPopularMovie!.id)
    const popularMovies: Movie[] = await getPopularMovies()
    const nowPlayingMovies: Movie[] = await getNowPlayingMovies()
    const upcomingMovies: Movie[] = await getUpComingMovies()


    const opts = {
        height: '1120',
        width: '1580',
        playerVars: {
            autoplay: 1,
        },
    };

   function _onReady(event : any){
        event.target.mute()
       event.target.playVideo();
    }


    return (
        <div>
            <div className={styles.hero}>
                <div className={styles.heroVideo}>
                    <YouTube videoId={await getVideoUrl(showCaseMovie!.id as number)?? undefined} opts={opts} onReady={_onReady} className={styles.video}/>
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