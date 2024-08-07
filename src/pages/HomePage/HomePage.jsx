import { useEffect, useState } from "react";
import { getMovie } from "../../components/axiosAPI";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const data = await getMovie();
                setMovies(data.results);
                setError(false);
            } catch (error) {
                setError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
                setError(false);
            }
        }
        getData();
    }, []);

    return (
        <div className={css.movieContainer}>
            {isLoading && <Loader />}

            {!isLoading && <h2 className={css.header}>Trending today</h2>}
            
            {!error && <MovieList movies={movies} />}
        </div>
    );
}