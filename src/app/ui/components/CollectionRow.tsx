"use client"
import styles from "@/app/ui/app.module.css";
import React, {useState} from "react";
import Movie from "@/app/classes/Movie";
import MovieCollectionCell from "@/app/ui/components/MovieCollectionCell";
import {getNowPlayingMovies, getPopularMovies, getUpComingMovies} from "@/app/services/movieService";
import Image from "next/image";

interface Props {
    title: string
    movies: Movie[]
    type: string
}

const CollectionRow: React.FC<Props> = ({ title, movies,type }) => {

    const [page, setPage] = useState<number>(2);

    // State for storing the movie data
    const [allMovies, setAllMovies] = useState<Movie[]>(movies);
    const addMoreMovies = async () => {
        try {
            let moreMovies: Movie[] = []
            switch (type){
                case 'Popular': {
                    moreMovies = await getPopularMovies(page);
                    break;
                }
                case 'NowPlaying': {
                    moreMovies = await getNowPlayingMovies(page);
                    break;
                }
                case 'UpComing': {
                    moreMovies = await getUpComingMovies(page);
                    break;
                }

            }



            // Update movies using the previous state
            setAllMovies((prevMovies) => [...prevMovies ?? [], ...moreMovies]);

            // Update the page
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching more movies:", error);
        }
    };
    return (
        <div className={styles.collectionContainer}>
            <h1 className={styles.collectionTitle}>{title}</h1>
            <div className={styles.scrollableContainer}>
                <div className={`flex gap-2 pl-20 pr-20 overflow-x-scroll ${styles.hight}`}>
                    {allMovies.map((movie: Movie) => (
                        <MovieCollectionCell movie={movie} key={movie.id} />
                    ))}
                    <Image
                        src="/loadMoreButton.svg"
                        width={259}
                        height={389}
                        alt={"poster"}
                        className={styles.addButton}
                        onClick={addMoreMovies}
                    />
                </div>
            </div>
        </div>
    );
};

export default CollectionRow;
