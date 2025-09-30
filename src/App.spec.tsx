import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("should render the main heading", () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
      name: /todo & calendar app/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
