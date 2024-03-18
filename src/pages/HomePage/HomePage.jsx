import { useEffect, useState } from "react";
import { getMovie } from "../../components/axiosAPI";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {

    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const data = await getMovie();
                setMovies(data.results);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <div className={css.movieContainer}>
            <h2 className={css.header}>Trending today</h2>

            {isLoading && <Loader />}
            
            {!isLoading && <MovieList movies={movies} />}
        </div>
    );
}