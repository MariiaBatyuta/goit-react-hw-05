import { Link } from "react-router-dom"
import css from "./MovieList.module.css"

export default function MovieList({ movies }) { 
    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id} className={css.list}>
                    <Link to={`/movies/${movie.id}`} state={movie.id}>{movie.title}</Link>
                </li>
            ))}
        </ul>
    )
}