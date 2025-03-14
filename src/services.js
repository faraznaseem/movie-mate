import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

// Configure API Request.
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

/**
 * Fetch movies from the TMDB API.
 * @param {string} [query=""] query to search for movies
 * @param {number} [page=1] page number to fetch
 * @returns {Promise<[Array, number]>} an array of movies and the total number of pages
 */
export const fetchMovies = async (query = "", page = 1) => {
  const endpoint = query.trim()
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `${API_BASE_URL}/discover/movie?page=${page}&sort_by=popularity.desc`; // Fetch most popular movies if query is empty
  try {
    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    // Log the data in development mode
    if (import.meta.env.MODE === "development") {
      console.log(data);
    }

    // Validate the response
    if (!data.results?.length) {
      console.log(data.Error || "Failed to fetch movies");
      return [[], 0];
    }
    if (!data.total_pages) {
      console.log(data.Error || "Failed to fetch page numbers");
      return [[], 0];
    }

    // Update the search count if the query is valid
    if (query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]);
    }

    // Return the movies and the total number of pages
    return [data.results, data.total_pages];
  } catch (error) {
    console.log(`Error fetching movies ${error}`);
    return [[], 0];
  }
};

/**
 * Fetch trending movies from the local database.
 * @returns {Promise<Array>} an array of movie objects from the local appwrite database.
 */
export const loadTrendingMovies = async () => {
  try {
    const movies = await getTrendingMovies();
    return movies || [];
  } catch (error) {
    console.log(`Error fetching trending movies ${error}`);
    return [];
  }
};

/**
 * Fetch a movie by its ID from the TMDB API.
 * @param {number|string} id - The ID of the movie to fetch.
 * @returns {Promise<Array>} an array of movie objects.
 */
export const fetchMovieById = async (id) => {
  const endpoint = `${API_BASE_URL}/movie/${id}`;
  try {
    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    // Log the data in development mode
    if (import.meta.env.MODE === "development") {
      console.log(data);
    }
    return data || {};
  } catch (error) {
    console.log(`Error fetching movie by id ${error}`);
    return {};
  }
};
