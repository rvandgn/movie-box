import axios from "axios";

// Token'ı API iyi dökümente edilmediği için burda tuttuyorum.
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2IyMGNjNmU4MWQyNjhlYWMwYWE2M2JlNGNhOWEyNSIsInN1YiI6IjYzMjk0Y2M0MzliNmMzMDA5ZTk5ZDliNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7d3voaBu0qzr9nXTYTqJOdZLrQ7gOcWO3z6_NCm2I-A';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});

export const getMovieDetails = id => {
    return api.get(`/movie/${id}`).then(res => res.data).catch(err => console.error(err));
}

export const searchMovies = query => {
    return api.get(`/search/movie?query=${query}`).then(res => res.data).catch(err => console.error(err));
}