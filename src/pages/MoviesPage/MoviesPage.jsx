import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import css from './MoviesPage.module.css';
import { getMovieSearch } from '../../components/axiosAPI';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

export default function MoviesPage() {
    const location = useLocation();
    const [searchMovie, setSearchMovie] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmptyResult, setIsEmptyResult] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setSearchQuery(query);
            handleSearch(query);
        }
    }, [location.search]);

    useEffect(() => {
        if (isEmptyResult) {
            setSearchQuery(""); // Empty the input when no movies are found
        }
    }, [isEmptyResult]);

    const handleSearch = async (query) => {
        try {
            setIsLoading(true);
            const data = await getMovieSearch(query);
            setSearchMovie(data.results);
            setIsEmptyResult(data.results.length === 0);
        } catch (error) {
            console.log(error);
            setIsEmptyResult(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            const url = `/movies/?query=${encodeURIComponent(searchQuery.trim())}`;
            window.history.pushState({}, '', url);
            handleSearch(searchQuery.trim());
        }
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className={css.searchForm}>
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleInputChange} 
                    placeholder="Search movies..." 
                    className={css.input} 
                />
                <button type="submit" className={css.button}>Search</button>
            </form>
            <div className={css.resultContainer}>
                {isLoading && <Loader />}
                {isEmptyResult && <p>No movies found.</p>}
                {!isLoading && !isEmptyResult && <MovieList movies={searchMovie} />}
            </div>
        </div>
    );
}
