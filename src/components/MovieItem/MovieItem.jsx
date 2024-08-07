import { Link, useLocation } from "react-router-dom";
import css from "./MovieItem.module.css";

export default function MovieItem({ movie }) {
    const location = useLocation();
    
    const url = movie.poster_path ? `http://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://www.geemagic.com/wp-content/uploads/2016/04/The-Movie-Product.png";
    
    return (
        <div className={css.container}>
            <Link id={movie.id} to={`/movies/${movie.id}`} state={{ from: location }}>
                <img className={css.img} src={url} alt={movie.title} />
            </Link>
        </div>
    );
}
