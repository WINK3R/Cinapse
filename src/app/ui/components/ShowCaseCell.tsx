
import React, {useEffect, useState} from 'react';
import styles from '@/app/ui/components/MovieCollectionCell.module.css';
import Movie from "@/app/classes/Movie";
import Image from "next/image";
import BottomDrawer from "@/app/ui/components/modalInfo";
interface MovieCellProps {
    movie: Movie
}
const ShowCaseCell: React.FC<MovieCellProps> = ({ movie }) => {
    const isMounted = React.useRef(false);
    const [isActive, setIsActive] = useState(false)
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = (value: boolean) => {
        setIsOpen(value);
    };
    useEffect(() => {
        isMounted.current = true;
    })

    const handleMoreButtonClick = () => {
       console.log("clicked")
       setIsActive(true)

    }

    const handleLeaveMouse = () => {
        // Set isActive to true when the "more-button" is clicked
        setIsActive(false)
    }
    return (
        <div className={styles.showCaseContainer} onMouseLeave={handleLeaveMouse}  >
            <div className={`${styles.overlayContainer} ${isActive?styles.detailed:''}`} onClick={() => {isActive?toggleDrawer(true):null}}>
                    <Image src={movie.backdropPath ?? movie.posterPath!} key={"BackDrop"+movie.id} alt={"poster"} className={styles.showCaseMovie} width={658} height={370} />
                    <div className={styles.showCaseMovieHover}  >
                        <div className={styles.showCaseMovieHoverInfo}>
                            <p className={styles.movieTitle}>{movie.title}</p>
                            <p className={styles.date}>{movie.releaseDate.getFullYear()}</p>
                            <Image src="/more-button.svg" className={styles.moreButton} onClick={handleMoreButtonClick} alt={"Details button"} width={55} height={55} ></Image>

                        </div>


                    </div>{
                    isMounted?
                    <Image src={movie.posterPath!} key={"Poster"+movie.id} alt={"poster"} className={`${styles.posterImage} ${isActive?styles.detailed:''}`} width={465} height={698}  />:<></>}
                </div>
            <BottomDrawer isOpen={isOpen} movie={movie} toggleDrawer={toggleDrawer}></BottomDrawer>
        </div>
    );
};

export default ShowCaseCell;