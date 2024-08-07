import css from "./MovieList.module.css";
import MovieItem from "../MovieItem/MovieItem";

export default function MovieList({ movies }) {
    return (
        <ul className={css.list}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.item}>
                    <MovieItem movie={movie} />
                </li>
            ))}
        </ul>
    );
}