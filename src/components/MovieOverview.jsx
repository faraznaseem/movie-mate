import React, { useEffect, useState } from "react";
import { fetchMovieById } from "../services.js";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";

const MovieOverview = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movieResult, setMovieResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await fetchMovieById(movieId);
      setMovieResult(result);
      setIsLoading(false);
    })();
  }, [movieId]);

  return (
    <>
      <Link to={`/movie/${movieId}`}></Link>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="wrapper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <img
              src={
                movieResult.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieResult.poster_path}`
                  : "../no-movie.png"
              }
              alt={movieResult.title || "No poster available"}
              className="rounded-lg w-full h-auto object-cover"
            />
            <div className="md:col-span-2">
              <h1>{movieResult.title || "N/A"}</h1>
              <p className="text-gray-100 text-lg">
                {movieResult.release_date} • {movieResult.status || "N/A"} •{" "}
                {Math.floor(movieResult.runtime / 60)}h{" "}
                {movieResult.runtime % 60}m
              </p>
              <div className="mt-3">
                <iframe
                  className="w-full h-64 rounded-lg"
                  src="https://www.youtube.com/embed/sample-trailer"
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <h2>Genres</h2>
              <div className="flex gap-2 mt-2">
                {movieResult.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-light-100 px-3 py-1 rounded-lg text-sm text-dark-100"
                  >
                    {genre.name || "N/A"}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2>Overview</h2>
              <p className="text-gray-100">{movieResult.overview || "N/A"}</p>
            </div>
            <div>
              <h2>Details</h2>
              <ul className="text-gray-100 space-y-1">
                <li>
                  <strong>Release Date:</strong>{" "}
                  {movieResult.release_date || "N/A"}
                </li>
                <li>
                  <strong>Countries:</strong>{" "}
                  {movieResult.production_countries
                    ? movieResult.production_countries
                        .map((country) => country.iso_3166_1)
                        .join(" • ")
                    : "N/A"}
                </li>
                <li>
                  <strong>Language:</strong>{" "}
                  {movieResult.spoken_languages
                    ? movieResult.spoken_languages
                        .map((language) => language.english_name)
                        .join(" • ")
                    : "N/A"}
                </li>
                <li>
                  <strong>Budget:</strong>{" "}
                  {movieResult.budget?.toLocaleString() === "0"
                    ? "N/A"
                    : "$" + movieResult.budget?.toLocaleString()}
                </li>
                <li>
                  <strong>Revenue:</strong>{" "}
                  {movieResult.revenue?.toLocaleString() === "0"
                    ? "N/A"
                    : "$" + movieResult.revenue?.toLocaleString()}
                </li>
                <li>
                  <strong>Tagline:</strong>{" "}
                  {movieResult.tagline === ""
                    ? "N/A"
                    : movieResult.tagline || "N/A"}
                </li>
                <li>
                  <strong>Production Companies:</strong>{" "}
                  {movieResult.production_companies
                    ? movieResult.production_companies
                        .map((company) => company.name)
                        .join(" • ")
                    : "N/A"}
                </li>
              </ul>
            </div>
            <Link to={`/`}>
              <div className="flex justify-start">
                <button className="inline-block mt-4 px-4 py-2 bg-light-100 text-dark-100 rounded-lg cursor-pointer">
                  Visit Homepage →
                </button>
              </div>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default MovieOverview;
