import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useFetch } from "./useFetch";
import { Form, Button, CardGroup } from "react-bootstrap";
import styled from "styled-components";
import Api from "./Api";
import MovieEntry from "./MovieEntry";

const App = () => {
  const [isMovies, setIsMovies] = useState(true);
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useFetch("", {
    results: [],
    resultMessage: "",
  });

  return (
    <StyledApp>
      <h1>Movie Snippets</h1>
      <Form
        onSubmit={(e) => {
          doFetch(isMovies ? Api.searchMovie(query) : Api.searchSeries(query));
          e.preventDefault();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="input-query">Look up movie</Form.Label>
          <Form.Control
            id="input-query"
            autoFocus
            spellCheck="false"
            type="text"
            placeholder="Search for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            id="radio-movies"
            label="Movies"
            checked={isMovies}
            onChange={() => setIsMovies(true)}
          />
          <Form.Check
            type="radio"
            id="radio-series"
            label="Series"
            checked={!isMovies}
            onChange={() => setIsMovies(false)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!query || isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </Form>
      {!isLoading && data.results && (
        <CardGroup className="mt-5">
          {data.results.map(({ id, ...movie }) => (
            <MovieEntry key={id} {...movie} />
          ))}
        </CardGroup>
      )}
      <FetchError isError={isError} resultMessage={data.resultMessage} />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  padding: 2em;
  min-height: 100vh;
  background-color: #282c34;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FetchError = ({ isError, resultMessage }) => {
  return !isError && !resultMessage ? null : (
    <p>{resultMessage || "An error occurred while fetching"}</p>
  );
};

export default App;
