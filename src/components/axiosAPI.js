import axios from "axios";

const urlTrendingMovie = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const urlSearch = 'https://api.themoviedb.org/3/search/movie';
const urlSearchById = 'https://api.themoviedb.org/3/movie';

const options = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmY3MGQ3MjcxNjQ4ODhmNjM0MjkzYWIxZDE4YzE1NiIsInN1YiI6IjY1ZTliYzAyMzM5NmI5MDE4Njg0YTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3p98ZN9iE_j1DIOaFeRPZWDPeXCMOZX7dkW2RdjIKcM',
    }
};

export async function getMovie () {
    try {
        const response = await axios.get(urlTrendingMovie, options);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}


export async function getMovieSearch(query) {
    try {
        let url = urlSearch + `?query=${query}`;
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getMovieById(id) {
    try {
        let urlById = urlSearchById + `/${id}?language=en-US`;
        const response = await axios.get(urlById, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function urlSearchMovieCast(id) {
    try {
        let urlById = urlSearchById + `/${id}/credits?language=en-US`;
        const response = await axios.get(urlById, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function urlSearchMovieReviews(id) {
    try {
        let urlById = urlSearchById + `/${id}/reviews?language=en-US&page=1`;
        const response = await axios.get(urlById, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}