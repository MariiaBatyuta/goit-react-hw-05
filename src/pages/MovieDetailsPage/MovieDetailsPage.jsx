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

    const infoRef = useRef(null);

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
                }, 100); 
            }
        };

        if (activeSection === 'cast' || activeSection === 'reviews') scrollToRef(infoRef);

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
                            <img 
                                src={selectedMovie.poster_path ? baseUrl + selectedMovie.poster_path : "https://www.geemagic.com/wp-content/uploads/2016/04/The-Movie-Product.png"} 
                                alt={selectedMovie.title} 
                                width={400} 
                                height={600} 
                            />
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
                        <div className={css.infoPart}>
                            <NavLink to={activeSection === 'cast' ? `/movies/${id}` : `/movies/${id}/cast`} className={css.navLink} onClick={() => handleToggleSection('cast')}>
                                Cast
                            </NavLink>
                            <NavLink to={activeSection === 'reviews' ? `/movies/${id}` : `/movies/${id}/reviews`} className={css.navLink} onClick={() => handleToggleSection('reviews')}>
                                Reviews
                            </NavLink>
                        </div>
                    </div>
                    <div className={css.line}></div>
                    <div ref={infoRef}></div>
                    <Outlet />
                </div>
            ) : (
                <div><Loader /></div>
            )}
        </div>
    );
}