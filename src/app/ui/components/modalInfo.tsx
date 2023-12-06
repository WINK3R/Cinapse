"use client"
import {useEffect, useState} from 'react';
import {IconButton, Rating, SwipeableDrawer} from "@mui/material";
import styles from "@/app/ui/components/modalInfo.module.css";
import Movie from "@/app/classes/Movie";
import { getGenreNameByIdMovie} from "../../../../values/MovieGenre";
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { Carousel } from 'flowbite-react';
import {
    getMovieImagesMovies,
    getMovieImagesSeries,
    getWatchProvidersMovie,
    getWatchProvidersSerie
} from "@/app/services/movieService";
import WatchProvider from "@/app/classes/WatchProvider";
import {getGenreNameByIdSerie} from "../../../../values/SerieGenre";
import Image from "next/image";
import {ImageMovie} from "@/app/classes/ImageMovie";


interface modalProps{
    movie: Movie
    isOpen: boolean
    toggleDrawer: (value : boolean) => void;
}
export function BottomDrawer({isOpen, movie, toggleDrawer}: modalProps){
    const [watchProviders, setWatchProviders] = useState<WatchProvider[]>([]);
    const [images, setImages] = useState<ImageMovie[]>([]);
    useEffect(() => {
        const fetchWatchProviders = async () => {
            try {
                let providers : WatchProvider[];
                if(movie.type == "movie"){
                     providers = await getWatchProvidersMovie(movie.id);

                }
                else {
                     providers = await getWatchProvidersSerie(movie.id);
                }
                setWatchProviders(providers);
            } catch (error) {
                console.error('Error fetching watch providers:', error);
            }
        };
        const fetchMovieImages = async () => {
            try {
                let movieImages : ImageMovie[];
                if(movie.type == "movie"){
                    movieImages = await getMovieImagesMovies(movie.id);

                }
                else {
                    movieImages = await getMovieImagesSeries(movie.id);
                }
                setImages(movieImages);
            } catch (error) {
                console.error('Error fetching movie images:', error);
            }
        };

        fetchWatchProviders();
        fetchMovieImages();
    }, [movie]);

    return (

            <SwipeableDrawer anchor="bottom" open={isOpen} onClose={() => {toggleDrawer(false)}} BackdropProps={{style:{backgroundColor:"black", opacity:0.4}}} PaperProps={{
                sx: {overflow:"scroll", minHeight: "100%",width: "70%",borderRadius: "20px 20px 0px 0px", margin: "auto", backgroundColor: "black", color: "white"}
            }} onOpen={function (event: React.SyntheticEvent<{}, Event>): void {
                throw new Error('Function not implemented.');
            }} allowSwipeInChildren={ true}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' , flexDirection: "column"}} className={styles.heroContainer}>
                        <div className={styles.heroImage}>
                            <div className={styles.heroInfo}>
                                <h1 className={styles.heroTitle}>{movie.title}</h1>
                                <div className={styles.heroChips}>
                                        {
                                            movie.genreIds.map((id : number, idx) => (
                                                <p key={idx} className={styles.chipGenre}>{movie.type == 'movie'?getGenreNameByIdMovie(id): getGenreNameByIdSerie(id)}</p>))
                                        }
                                    <p className={styles.chipGenre}>{movie.releaseDate.getFullYear()}</p>

                                </div>
                                <div className={styles.heroChips}>
                                    <Rating name="read-only" size="small" value={movie.voteAverage/2} precision={0.5} readOnly   emptyIcon={<StarIcon style={{ opacity: "100%", color: "#B9B9B9" }} fontSize="inherit" />}
                                    />
                                    <p style={{color: "#FFC42D", paddingLeft: "5px", fontWeight: "bold", fontSize: "14px"}}>{movie.voteAverage.toFixed(1)}</p>
                                </div>
                                <div className={styles.heroChips}>
                                    {
                                        watchProviders.map((provider : WatchProvider, index: number) => (
                                            provider.logoPath && provider.displayPriority < 12 && (<Image key={"provider"+index} src={provider.logoPath} alt={provider.providerName} width={50} height={50} className={styles.providerLogo}></Image>)))
                                    }
                                    {
                                        watchProviders.length > 0 && (<div className={styles.label_provider}>
                                            <p>Disponible en streaming</p>
                                            <p>Regarder maintenant</p>
                                        </div>)
                                    }

                                </div>
                            </div>
                            <img src={movie.backdropPath!} alt="icon" className={styles.heroImage}/>
                            <div className={styles.fader_wrapper}>
                                <div className={styles.fader_diagonal_gradient}></div>
                                <div className={styles.fader_bottom_gradient}></div>
                                <div className={styles.fader_solid_bg}></div>
                            </div>

                        </div>
                        <div className={styles.closeButtonWrapper}>
                            <IconButton
                                onClick={() => { toggleDrawer(false) }}
                                size="small"
                                className={styles.closeButton}
                            >
                                <CloseIcon fontSize="small" className={styles.closeButton}/>
                            </IconButton>
                        </div>

                        <p className={styles.overview}>{movie.overview}</p>

                    </div>
                    <Carousel indicators={false} className={styles.carousel}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.file_path ?? ""}
                                alt={movie.title + " image"}
                                width={"200px"}
                                height={"200px"}
                                className={styles.backdrop}
                            />
                        ))}
                    </Carousel>
                </div>



            </SwipeableDrawer>
    );
}

export default BottomDrawer;
