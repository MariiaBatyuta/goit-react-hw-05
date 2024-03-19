import { useEffect, useRef, useState } from "react";
import { getMovieById } from "../../components/axiosAPI"; 
import { NavLink, Outlet, useParams, useLocation, Link } from "react-router-dom";
import css from './MovieDetailsPage.module.css';
import Loader from "../../components/Loader/Loader";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showCast, setShowCast] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const location = useLocation();

    useEffect(() => {
        async function fetchMovie() {
            try {
                const movieData = await getMovieById(id);
                setSelectedMovie(movieData);
            } catch (error) {
                console.error(error);
            }
        }

        if (id) {
            fetchMovie();
        }
    }, [id]);

    const handleToggleCast = () => {
        setShowCast(!showCast);
        setShowReviews(false); 
    };

    const handleToggleReviews = () => {
        setShowReviews(!showReviews);
        setShowCast(false); 
    };

    const backLinkRef = useRef(location.state ?? "/");

    return (
       <div>
            {selectedMovie ? (
                <div className={css.container}>
                    <Link to={backLinkRef.current}>
                        <button className={css.goBackButton}>Go back!</button>
                    </Link>
                    
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
                                <NavLink to={showCast ? `/movies/${id}` : `/movies/${id}/cast`}>Cast</NavLink>
                            </li>
                            <li onClick={handleToggleReviews}>
                                <NavLink to={showReviews ? `/movies/${id}` : `/movies/${id}/reviews`}>Reviews</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={css.line}></div>
                    <Outlet />
                </div>
            ) : (
                <div><Loader /></div>
            )}
        </div>
    );
}

