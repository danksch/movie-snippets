import { render, screen } from "@testing-library/react";
import MovieEntry, { Rating } from "./MovieEntry";

describe("testing MovieEntry", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("renders component correctly when props are passed", async () => {
    const score = "7";
    const movie = {
      id: 3,
      image: "",
      title: "Batman",
      description: "Just a Batman movie",
    };
    fetch.mockResponseOnce(JSON.stringify({ imDb: score }));
    render(<MovieEntry {...movie} />);
    expect(await screen.findByText(score)).toBeInTheDocument();
  });
});

describe("testing Rating", () => {
  it("renders component with props correctly", () => {
    const score = "9.2";
    render(<Rating value={score} />);
    expect(screen.getByText(score)).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("render nothing when no props are passed", () => {
    render(<Rating />);
    expect(screen.queryByTestId("star-icon")).not.toBeInTheDocument();
  });
});
