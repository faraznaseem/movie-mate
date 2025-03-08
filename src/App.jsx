import { useEffect } from "react";
import Search from "./components/Search.jsx";
import { useState } from "react";
import { useDebounce } from "react-use";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { fetchMovies, loadTrendingMovies } from "./services.js";
import Pagination from "./components/Pagination.jsx";

// The main app rendering component.
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovieList, setTrendingMovieList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce the search term to prevent too many API requests.
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 600, [searchTerm]);

  // Call fetch movies on whenever debounced search term state changes.
  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMessage("");
      const [results, total_pages] = await fetchMovies(
        debouncedSearchTerm,
        currentPage
      );
      if (results.error) {
        setErrorMessage(results.error);
      } else {
        setMovieList(results);
        // Limit the fetched total pages to 500 if the api returns total_pages > 500 since "TMDB API" api only allow fetching 500 pages.
        if (total_pages > 500) {
          setTotalPages(500);
        }
        // If the fetched total pages are less than 500 then set them.
        else {
          setTotalPages(total_pages);
        }
      }
      setLoading(false);
    })();
  }, [debouncedSearchTerm, currentPage]);

  // Load trending movies on every page load.
  useEffect(() => {
    (async () => {
      const trendingMovies = await loadTrendingMovies();
      setTrendingMovieList(trendingMovies);
    })();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./logo.svg" alt="Logo" className="w-20 h-20" />
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&#39;ll Enjoy
            Without the Hassle
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setPageNumber={setCurrentPage}
          />
        </header>

        {trendingMovieList.length > 0 && (
          <section className="trending">
            <h2>Trending</h2>
            <ul>
              {trendingMovieList.map((movie, index) => (
                <li key={movie.movie_id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
        <footer>
          <Pagination
            totalPages={totalPages}
            setPageNumber={setCurrentPage}
            currentPage={currentPage}
          />
        </footer>
      </div>
    </main>
  );
};

export default App;
