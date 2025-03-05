
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

// Configure API Request.
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

// Fetch the movies.
export const fetchMovies = async (query = '') => {
    try {
        const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        if (import.meta.env.MODE === "development") {
            console.log(data);
        }
        if (!data.results?.length) {
            console.log(data.Error || 'Failed to fetch movies');
            return [];
        }
        if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
        }
        return data.results || [];
    } catch (error) {
        console.log(`Error fetching movies ${error}`);
        return [];
    }
}

export const loadTrendingMovies = async () => {
    try {
        const movies = await getTrendingMovies();
        return movies || [];
    } catch (error) {
        console.log(`Error fetching trending movies ${error}`);
        return [];
    }
}