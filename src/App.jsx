import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [emptyMessage, setEmptyMessage] = useState(false);
  const [wrongURLMessage, setWrongURLMessage] = useState(false);

  async function fetchMoviesHandler() {
    // clear errors, render loading message
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch(
        "https://swapi.dev/api/film" + (wrongURLMessage ? "" : "s")
      ); // correct end point is /films

      if (!response.ok) throw new Error("HTTP error");

      const data = await response.json();

      const transformedMovies = (emptyMessage ? [] : data.results).map(
        (movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        }
      );
      setMovies(transformedMovies);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  let content = <p>No movies found</p>;
  if (!isLoading && !error) {
    if (movies.length) content = <MoviesList movies={movies} />;
  } else content = null;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        Using {!emptyMessage && "non-"}empty movie list &nbsp;
        <button onClick={() => setEmptyMessage((prev) => !prev)}>Toggle</button>
        <br />
        <br />
        Using {wrongURLMessage ? "wrong" : "correct"} URL &nbsp;
        <button onClick={() => setWrongURLMessage((prev) => !prev)}>
          Toggle
        </button>
      </section>
      <section>
        {isLoading && "Loading..."}
        {error && error.toString()}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
