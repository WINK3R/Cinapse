"use client"
import styles from '@/app/ui/app.module.css';
import React, {useEffect, useState} from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import HeroButtonPrimary from '@/app/ui/components/HeroButtonPrimary';
import HeroButtonSecondary from '@/app/ui/components/HeroButtonSecondary';
import CollectionRow from '@/app/ui/components/CollectionRow';
import {
    getMostPopularMovie,
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getTopRatedSeries,
    getTrending,
} from '@/app/services/movieService';
import {ShowCaseCollection} from '@/app/ui/components/ShowCaseCollection';
import Movie from '@/app/classes/Movie';
import Image from 'next/image';
import {Skeleton} from "@mui/material";

export default function Page() {
    const [theMostPopularMovie, setTheMostPopularMovie] = React.useState<Movie | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        getMostPopularMovie().then((movie) => {
            setTheMostPopularMovie(movie);
        });
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const calculateOpacity = () => {
        // Adjust these values based on your design
        const scrollStart = 0;
        const scrollEnd = 500;
        const maxOpacity = 1;

        // Calculate the percentage of scroll progress
        const scrollPercentage = Math.min(1, scrollPosition / (scrollEnd - scrollStart));

        // Calculate opacity based on scroll position
        return 1 - scrollPercentage * maxOpacity;
    };

    return (
        <div>
            <div className={styles.hero}>
                <div className={styles.heroVideo}>
                    {theMostPopularMovie?.backdropPath && (
                        <Image
                            src={theMostPopularMovie?.backdropPath}
                            alt={'poster path'}
                            priority={true}
                            className={styles.heroImage}
                            width={1920}
                            height={1080}
                            style={{ opacity: calculateOpacity() }}
                        />
                    )}
                </div>
                <div className={styles.heroInfo}> {
                    theMostPopularMovie == null?<Skeleton animation="wave" variant={"rounded"} height={30} width={400} sx={{ bgcolor: 'grey.900' }}/>:<h1 className={styles.heroTitle}>{theMostPopularMovie?.title}</h1>
                }

                    <div className={styles.heroButtons}>
                        <HeroButtonPrimary>En savoir +</HeroButtonPrimary>
                        <HeroButtonSecondary>Enregistrer</HeroButtonSecondary>
                    </div>
                </div>
                <div className={styles.fader_wrapper}>
                    <div className={styles.fader_diagonal_gradient}></div>
                    <div className={styles.fader_bottom_gradient}></div>
                    <div className={styles.fader_solid_bg}></div>
                </div>
            </div>
            <div className={styles.containerHome}>
                <ShowCaseCollection title={'Tendances'} fetchFunction={getTrending} />
                <CollectionRow title={'Au cinéma'} fetchFunction={getNowPlayingMovies} />
                <ShowCaseCollection title={'Populaires'} fetchFunction={getPopularMovies} />
                <CollectionRow title={'Top Films'} fetchFunction={getTopRatedMovies} />
                <CollectionRow title={'Top Séries'} fetchFunction={getTopRatedSeries} />
            </div>
        </div>
    );
}
