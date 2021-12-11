import { render, screen } from "@testing-library/react";
import MovieEntry, { Rating } from "./MovieEntry";

describe("testing MovieEntry", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
it('renders component correctly when props are passed', () => {
  const score = '7';
    fetch.mockResponseOnce(JSON.stringify({ imDb: score }));

    render(<MovieEntry />);
    expect(screen.getByText(score)).toBeInTheDocument();
})
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