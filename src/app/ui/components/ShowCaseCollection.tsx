import styles from "@/app/ui/app.module.css";
import React, {useEffect, useRef, useState} from "react";
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
    const [isAtMaxScroll, setIsAtMaxScroll] = useState<boolean>(false);
    const [isAtMinScroll, setIsAtMinScroll] = useState<boolean>(true);
    const collectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData()
    }, [])

    function handleAdd() {
        fetchData()
    }

    function scrollCollection(left: boolean) {
        if (collectionRef.current) {
            const container = collectionRef.current;
            container.scrollBy({
                left: left ? -(container.clientWidth-180) : container.clientWidth - 180,
                behavior: 'smooth',
            });
        }
    }

    function isAtMaxOrMinScroll() {
        console.log(collectionRef.current?.scrollLeft)
        console.log(collectionRef.current?.scrollWidth! - 1100)
        if (collectionRef.current) {
            const container = collectionRef.current;
            setIsAtMaxScroll(container.scrollLeft >= (container.scrollWidth- container.clientWidth - 100));
            setIsAtMinScroll(container.scrollLeft <= 100);
        }
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
            <div ref={collectionRef} onScroll={isAtMaxOrMinScroll} className={`flex gap-2 pl-20 pr-20 overflow-x-scroll overflow-y-hidden ${styles.spacingRow}`}>
                {movies.map((movie: Movie, idx) => (
                    <ShowCaseCell movie={movie} key={idx}/>
                ))}
                <div className={styles.scrollButtonContainer} style={{ display: isAtMaxScroll ? 'none' : 'flex' }} onClick={() => { scrollCollection(false) }}>
                    <Image className={styles.scrollButton} src={"/right-scroll.png"} alt={"scroll right"} width={50} height={50}></Image>
                </div>
                <div className={styles.scrollButtonContainerLeft} style={{ display: isAtMinScroll ? 'none' : 'flex' }} onClick={() => { scrollCollection(true) }}>
                    <Image className={`${styles.scrollButton} ${styles.left}`} src={"/right-scroll.png"} alt={"scroll left"} width={50} height={50}></Image>
                </div>
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



