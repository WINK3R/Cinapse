"use client"
import {ShowCaseCollection} from "@/app/ui/components/ShowCaseCollection";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getTrendingMovies
} from "@/app/services/movieService";
import CollectionRow from "@/app/ui/components/CollectionRow";
import styles from "@/app/movies/page.module.css";
import React from "react";

export default function Page() {
    return <div className={styles.moviesPage}>
        <ShowCaseCollection title={'Tendances'} fetchFunction={getTrendingMovies} />
        <CollectionRow title={'Nouveautés'} fetchFunction={getNowPlayingMovies} />
        <CollectionRow title={'Populaires'} fetchFunction={getPopularMovies} />
        <CollectionRow title={'Top des Films'} fetchFunction={getTopRatedMovies} />
    </div>;
}
