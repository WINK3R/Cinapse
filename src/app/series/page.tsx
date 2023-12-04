"use client"
import {ShowCaseCollection} from "@/app/ui/components/ShowCaseCollection";
import {
     getNowPlayingSeries,
    getPopularSeries,
    getTopRatedSeries,
    getTrendingSeries
} from "@/app/services/movieService";
import CollectionRow from "@/app/ui/components/CollectionRow";
import styles from "@/app/series/page.module.css";
import React from "react";

export default function Page() {
    return <div className={styles.seriesPage}>
        <ShowCaseCollection title={'Tendances'} fetchFunction={getTrendingSeries} />
        <CollectionRow title={'Nouveautés'} fetchFunction={getNowPlayingSeries} />
        <CollectionRow title={'Populaires'} fetchFunction={getPopularSeries} />
        <CollectionRow title={'Top des Séries'} fetchFunction={getTopRatedSeries} />
    </div>;
}
