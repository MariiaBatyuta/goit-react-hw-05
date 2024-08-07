import { useEffect, useRef, useState } from "react";
import { getMovieById } from "../../components/axiosAPI";
import { NavLink, Outlet, useParams, useLocation, Link } from "react-router-dom";
import css from './MovieDetailsPage.module.css';
import Loader from "../../components/Loader/Loader";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const location = useLocation();

    const castRef = useRef(null);
    const reviewsRef = useRef(null);

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

    useEffect(() => {
        const scrollToRef = (ref) => {
            if (ref.current) {
                setTimeout(() => {
                    ref.current.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Невелика затримка для оновлення DOM
            }
        };

        if (activeSection === 'cast') {
            scrollToRef(castRef);
        } else if (activeSection === 'reviews') {
            scrollToRef(reviewsRef);
        }
    }, [activeSection]);

    const handleToggleSection = (section) => {
        if (activeSection === section) {
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    };

    const backLinkRef = useRef(location.state?.from ?? "/");

    return (
        <div className={css.container}>
            {selectedMovie ? (
                <div className={css.content}>
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
                        <ul className={css.infoPart}>
                            <li onClick={() => handleToggleSection('cast')} ref={castRef} className={css.navLink}>
                                <NavLink to={activeSection === 'cast' ? `/movies/${id}` : `/movies/${id}/cast`} className={css.navLink}>
                                    Cast
                                </NavLink>
                            </li>
                            <li onClick={() => handleToggleSection('reviews')} ref={reviewsRef} className={css.navLink}>
                                <NavLink to={activeSection === 'reviews' ? `/movies/${id}` : `/movies/${id}/reviews`} className={css.navLink}>
                                    Reviews
                                </NavLink>
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