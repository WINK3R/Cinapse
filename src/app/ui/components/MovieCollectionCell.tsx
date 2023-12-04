
import React from 'react';
import styles from '@/app/ui/components/MovieCollectionCell.module.css';
import Movie from "@/app/classes/Movie";
import Image from "next/image";
import BottomDrawer from "@/app/ui/components/modalInfo";
interface MovieCellProps {
    movie: Movie
}
const MovieCollectionCell: React.FC<MovieCellProps> = ({ movie }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = (value: boolean) => {
        setIsOpen(value);
    };

    return (

            movie.posterPath && (<>
                        <Image src={movie.posterPath!} width={259} height={389}  key={movie.id}  alt={"poster"} className={styles.movieCover} onClick={() => {toggleDrawer(true)}}/>
                        <BottomDrawer isOpen={isOpen} movie={movie} toggleDrawer={toggleDrawer}></BottomDrawer>
                </>
)
    );
};

export default MovieCollectionCell;