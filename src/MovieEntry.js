import { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import Api from "./Api";
import { useFetch } from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieEntry = ({ id, image, title, description }) => {
  const [{ data, isLoading }, doFetch] = useFetch("", {
    imDb: "",
  });

  useEffect(() => {
    if (!id) return;
    doFetch(Api.getRating(id));
  }, [id, doFetch]);

  return (
    <Card border="light" className="bg-dark text-white mb-3">
      <Card.Img
        variant="top"
        /* 
          Pass the actual poster url from the imdb api as an URL query parameter to the weserv backend
          for smaller images and less loading time, 
          where 'h' is height parameter (ratio is kept) and 'q' quality parameter.
        */
        src={`//images.weserv.nl/?url=${image}&h=200&q=90`}
        alt="Movie poster"
        loading="lazy"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Rating value={data.imDb} />
        )}
      </Card.Body>
    </Card>
  );
};

const Rating = ({ value }) => {
  return value ? (
    <>
      {value}&nbsp;
      <FontAwesomeIcon icon={faStar} color="yellow" />
    </>
  ) : null;
};

export default MovieEntry;
