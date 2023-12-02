"use client"
import styles from "@/app/ui/app.module.css";
import React, {useState} from "react";
import Movie from "@/app/classes/Movie";
import {getUpComingMovies} from "@/app/services/movieService";
import ShowCaseCell from "@/app/ui/components/ShowCaseCell";
import Image from "next/image";

interface Props {
    title: string
    movies: Movie[]
}

const ShowCaseCollection: React.FC<Props> = ({ title, movies }) => {

    const [page, setPage] = useState<number>(2);

    // State for storing the movie data
    const [allMovies, setAllMovies] = useState<Movie[]>(movies);
    const addMoreMovies = async () => {
        try {
            let moreMovies = await getUpComingMovies(page);




            // Update movies using the previous state
            setAllMovies([...allMovies, ...moreMovies])

            // Update the page
            setPage(page+1);
        } catch (error) {
            console.error("Error fetching more movies:", error);
        }
    };
    return (
        <div className={styles.collectionContainer}>
            <h1 className={styles.collectionTitle}>{title}</h1>
                <div className={`flex gap-2 pl-20 pr-20 overflow-x-scroll overflow-y-hidden ${styles.hight}`}>
                    {allMovies.map((movie: Movie) => (
                        <ShowCaseCell movie={movie} key={movie.id} />
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
    );
};

export default ShowCaseCollection;
