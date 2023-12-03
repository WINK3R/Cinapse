import styles from "@/app/ui/app.module.css";
import React, {useEffect, useState} from "react";
import Movie from "@/app/classes/Movie";
import ShowCaseCell from "@/app/ui/components/ShowCaseCell";
import Image from "next/image";

interface props {
    title: string
    fetchFunction: (page : number) => Promise<Movie[]>;
}

export function ShowCaseCollection({title, fetchFunction}: props) {
    const [page, setPage] = useState<number>(1);
    const [movies, setMovies] = useState<Movie[]>([])
    useEffect(() => {
        fetchFunction(page).then((movies) => {
            setMovies(movies)
            setPage(page + 1)
        })
    }, [])

    function handleAdd() {
        fetchFunction(page).then((newMovies) => {
            setMovies([...movies, ...newMovies])
            setPage(page + 1)
        })
    }


    return (
        <div className={styles.collectionContainer}>
            <h1 className={styles.collectionTitle}>{title}</h1>
            <div className={`flex gap-2 pl-20 pr-20 overflow-x-scroll overflow-y-hidden ${styles.spacingRow}`}>
                {movies.map((movie: Movie, idx) => (
                    <ShowCaseCell movie={movie} key={idx}/>
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
    )
}



