import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    // clear errors, render loading message
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch("https://swapi.dev/api/film"); // deliberate error, correct => '/films'

      if (!response.ok) throw new Error("HTTP error");

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && "Loading..."}
        {error && error.toString()}
        {!isLoading &&
          !error &&
          (movies.length !== 0 ? (
            <MoviesList movies={movies} />
          ) : (
            <p>No movies found</p>
          ))}
      </section>
    </React.Fragment>
  );
}

export default App;
