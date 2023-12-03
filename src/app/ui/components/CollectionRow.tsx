
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
        fetchFunction(page).then((movies) => {
            setMovies(movies)
            setPage(page + 1)
        })
    }, [])
    return (
        <div className={styles.collectionContainer}>
            <h1 className={styles.collectionTitle}>{title}</h1>
            <div className={`${styles.scrollableContaine} ${styles.spacingRow}`}>
                <div className={`flex gap-2 pl-20 pr-20 overflow-x-scroll`}>
                    {movies.map((movie: Movie) => (
                        <MovieCollectionCell movie={movie} key={movie.id} />
                    ))}
                    <Image
                        src="/loadMoreButton.svg"
                        width={259}
                        height={389}
                        alt={"poster"}
                        className={styles.addButton}
                    />
                </div>
            </div>
        </div>
    );
}

export default CollectionRow;
