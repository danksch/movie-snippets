import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useFetch } from "./useFetch";
import { Form, Button, CardGroup, Alert } from "react-bootstrap";
import styled from "styled-components";
import Api from "./Api";
import MovieEntry from "./MovieEntry";

const App = () => {
  const [isMovie, setIsMovie] = useState(true);
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useFetch("", {
    results: [],
    errorMessage: "",
  });

  return (
    <StyledApp>
      <h1>Movie Snippets</h1>
      <Form
        className="mb-5"
        onSubmit={(e) => {
          doFetch(isMovie ? Api.searchMovie(query) : Api.searchSeries(query));
          e.preventDefault();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="input-query">Title</Form.Label>
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
            id="radio-movie"
            label="Movie"
            checked={isMovie}
            onChange={() => setIsMovie(true)}
          />
          <Form.Check
            type="radio"
            id="radio-series"
            label="Series"
            checked={!isMovie}
            onChange={() => setIsMovie(false)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!query || isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </Form>
      {!isLoading && data.results && (
        <CardGroup>
          {data.results.map((movie) => (
            <MovieEntry key={movie.id} {...movie} />
          ))}
        </CardGroup>
      )}
      <FetchError isError={isError} errorMessage={data.errorMessage} />
      <ApiHintContainer>powered by IMDb API</ApiHintContainer>
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

/* 
  isError represents actual error responses (status 400, 500), 
  while the errorMessage prop gets set in the api response in a 200 response
  under specific circumstances (e.g.: limit of the daily allowed queries to the api
  has been reached)
*/
const FetchError = ({ isError, errorMessage }) => {
  return !isError && !errorMessage ? null : (
    <Alert variant="danger">
      {errorMessage || "An error occurred while fetching"}
    </Alert>
  );
};

const ApiHintContainer = styled.div`
  position: absolute;
  bottom: 5px;
  color: lightgrey;
  opacity: 0.8;
  font-size: 0.8em;
`;

export default App;
