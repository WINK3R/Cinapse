"use client";
import React, {useState} from 'react';
import styles from '@/app/ui/components/MovieCollectionCell.module.css';
import Movie from "@/app/classes/Movie";
interface MovieCellProps {
    movie: Movie
}
const ShowCaseCell: React.FC<MovieCellProps> = ({ movie }) => {
    const [isActive, setIsActive] = useState(false)

    const handleMoreButtonClick = () => {
        // Set isActive to true when the "more-button" is clicked
        setIsActive(true)
        console.log("clicked")
    }

    const handleLeaveMouse = () => {
        // Set isActive to true when the "more-button" is clicked
        setIsActive(false)
    }
    return (
        <div className={styles.showCaseContainer} onMouseLeave={handleLeaveMouse}>
            {movie.backdropPath &&
                <div className={`${styles.overlayContainer} ${isActive?styles.detailed:''}`}>
                    <img src={movie.backdropPath} key={movie.id} alt={"poster"} className={styles.showCaseMovie} />
                    <div className={styles.showCaseMovieHover} >
                        <div className={styles.showCaseMovieHoverInfo}>
                            <p className={styles.movieTitle}>{movie.title}</p>
                            <p className={styles.date}>{movie.releaseDate.getFullYear()}</p>
                            <img src="/more-button.svg" className={styles.moreButton} onClick={handleMoreButtonClick}></img>

                        </div>


                    </div>
                    <img src={movie.posterPath!} key={movie.id} alt={"poster"} className={`${styles.posterImage} ${isActive?styles.detailed:''}`} />
                </div>

            }
        </div>
    );
};

export default ShowCaseCell;