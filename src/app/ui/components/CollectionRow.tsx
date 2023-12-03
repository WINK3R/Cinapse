
import styles from "@/app/ui/app.module.css";
import React, {useEffect, useState} from "react";
import Movie from "@/app/classes/Movie";
import MovieCollectionCell from "@/app/ui/components/MovieCollectionCell";
import Image from "next/image";

interface props {
    title: string
    fetchFunction: (page : number) => Promise<Movie[]>;
}

export function CollectionRow({title, fetchFunction}: props) {
    const [page, setPage] = useState<number>(1);
    const [movies, setMovies] = useState<Movie[]>([])
    useEffect(() => {
        fetchData()
    }, [])

    function handleAdd() {
        fetchData()
    }

    function fetchData() {
        fetchFunction(page).then((newMovies) => {
            setMovies((prevMovies) => {
                const uniqueNewMovies = newMovies.filter(
                    (newMovie) => !prevMovies.some((prevMovie) => prevMovie.title === newMovie.title)
                );

                return [...prevMovies, ...uniqueNewMovies];
            });
            setPage((prevPage) => prevPage + 1);
        });
    }
    return (
        <div className={styles.collectionContainer}>
            <h1 className={styles.collectionTitle}>{title}</h1>

                <div className={`flex gap-2 pl-20 pr-20 overflow-x-scroll overflow-y-visible ${styles.spacingRow}`}>
                    {movies.map((movie: Movie) => (
                        <MovieCollectionCell movie={movie} key={movie.id} />
                    ))}
                    <Image
                        src="/loadMoreButton.svg"
                        width={259}
                        height={389}
                        alt={"poster"}
                        className={styles.addButton}
                        onClick={handleAdd}
                    />
                </div>
        </div>
    );
}

export default CollectionRow;
