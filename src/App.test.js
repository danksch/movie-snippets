import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("testing App", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders error component with custom API message when result message is not empty", async () => {
    const errorMessage = "This is a custom result message from the API.";
    fetch.mockResponseOnce(
      JSON.stringify({
        errorMessage,
      })
    );

    render(<App />);
    fireEvent.change(screen.getByLabelText("Look up movie"), { target: { value: "42" } });
    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it("renders error component with fixed error message when API call throws error", async () => {
    fetch.mockRejectOnce();

    render(<App/>);
    fireEvent.change(screen.getByLabelText("Look up movie"), { target: { value: "42" } });
    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("An error occurred while fetching")).toBeInTheDocument();
  });
});
