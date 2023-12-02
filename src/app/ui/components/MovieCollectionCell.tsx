'use client'
import React from 'react';
import styles from '@/app/ui/components/MovieCollectionCell.module.css';
import Movie from "@/app/classes/Movie";
import Image from "next/image";
interface MovieCellProps {
    movie: Movie
}
const MovieCollectionCell: React.FC<MovieCellProps> = ({ movie }) => {

    return (
        <>

            {movie.posterPath?
                    <Image src={movie.posterPath!} width={259} height={389}  key={movie.id}  alt={"poster"} className={styles.movieCover} />
                :<></>}
        </>
    );
};

export default MovieCollectionCell;