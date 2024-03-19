import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id} className={css.list}>
                    <Link id={movie.id} to={`/movies/${movie.id}` } state={location.pathname + location.search}>{movie.title}</Link>
                </li>
            ))}
        </ul>
    );
}
