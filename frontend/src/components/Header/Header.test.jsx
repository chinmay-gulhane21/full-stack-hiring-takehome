import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  // Test if header renders
  test("renders header", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText("Companies App")).toBeInTheDocument();
  });

  // Test if the Home button renders
  test("renders Home button", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  // Test if the API Documentation button renders
  test("renders API Documentation button", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText("API Documentation")).toBeInTheDocument();
  });

  // Test if clicking Home button navigates to home page
  test("navigates to home page on Home button click", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    fireEvent.click(screen.getByText("Home"));
    // Check if the navigation happened correctly
    expect(window.location.pathname).toBe("/");
  });

  // Test if API Documentation button opens correct link in a new tab
  test("API Documentation button opens correct link in a new tab", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const apiButton = screen.getByText("API Documentation");
    expect(apiButton).toHaveAttribute(
      "href",
      "https://app.swaggerhub.com/apis/CHINMAYGULHANE_1/Company/1.0.0#/"
    );
    expect(apiButton).toHaveAttribute("target", "_blank");
  });
});
