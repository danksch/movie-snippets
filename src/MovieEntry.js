import { Card } from "react-bootstrap";

const MovieEntry = ({ image, title, description }) => {
  return (
    <Card
      border="light"
      className="bg-dark text-white mb-3"
    >
      <Card.Img
        variant="top"
        src={`//images.weserv.nl/?url=${image}&h=200&q=90`}
        alt="Movie poster"
        loading="lazy"
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default MovieEntry;
