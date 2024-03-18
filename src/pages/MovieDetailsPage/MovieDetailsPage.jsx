import { useEffect, useState, useRef } from "react";
import { getMovieById } from "../../components/axiosAPI"; 
import { NavLink, Outlet, useLocation } from "react-router-dom";
import css from './MovieDetailsPage.module.css';
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import Loader from "../../components/Loader/Loader";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
    const location = useLocation();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieId, setMovieId] = useState(null); 

    const [showCast, setShowCast] = useState(false);
    const [showReviews, setShowReviews] = useState(false);

    const prevUrlRef = useRef(null);

    useEffect(() => {
        if (location.state) {
            setMovieId(location.state);
        }
    }, [location.state]);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const movieData = await getMovieById(movieId);
                setSelectedMovie(movieData);
            } catch (error) {
                console.error(error);
            }
        }

        if (movieId) {
            fetchMovie();
        }
    }, [movieId]);

    useEffect(() => {
        prevUrlRef.current = window.location.href;
    }, []);

    const handleToggleCast = () => {
        setShowCast(!showCast);
        setShowReviews(false); 
    };

    const handleToggleReviews = () => {
        setShowReviews(!showReviews);
        setShowCast(false); 
    };


  const handleGoBack = () => {
    if (showCast || showReviews) {
        setShowCast(false);
        setShowReviews(false);
        window.history.back();
        window.history.back();
    } else {
        window.history.back();
    }
};


    return (
       <div>
            {selectedMovie ? (
                <div className={css.container}>
                    <button className={css.goBackButton} onClick={handleGoBack}>Go back!</button>
                    <div className={css.movieInfo}>
                        <div className={css.posterContainer}>
                            <img src={baseUrl + selectedMovie.poster_path} alt={selectedMovie.title} width={400} height={600} />
                        </div>
                        <div className={css.details}>
                            <h3>{selectedMovie.original_title}</h3>
                            <p>User score: {Math.round(selectedMovie.vote_average * 10)}%</p>
                            <b>Overview</b>
                            <p>{selectedMovie.overview}</p>
                            <b>Genres</b>
                            <p>{selectedMovie.genres.map((genre) => genre.name).join(', ')}</p>
                        </div>
                    </div>
                    <div className={css.line}></div>
                    <div className={css.details}>
                        <h3>Additional information</h3>
                        <ul>
                            <li onClick={handleToggleCast}>
                                <NavLink to={showCast ? `/movies/${movieId}` : `/movies/${movieId}/cast`}>Cast</NavLink>
                            </li>
                            <li onClick={handleToggleReviews}>
                                <NavLink to={showReviews ? `/movies/${movieId}` : `/movies/${movieId}/reviews`}>Reviews</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={css.line}></div>
                    {showCast && <div><MovieCast movieId={movieId} /></div>}
                    {showReviews && <div><MovieReviews movieId={movieId} /></div>}
                    <Outlet />
                </div>)
            : (<div><Loader /></div>)}
        </div>
    );
}
