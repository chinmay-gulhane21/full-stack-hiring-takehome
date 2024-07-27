import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CompanyCard from "./CompanyCard";

const companies = [
  {
    company_id: "1",
    name: "AgroFuture Corporation",
    address: "505 Harvest Road, Des Moines, IA 50309",
  },
  {
    company_id: "2",
    name: "EcoHarbor Resorts",
    address: "707 Beachfront Drive, Honolulu, HI 96815",
  },
];

describe("CompanyCard Component", () => {
  test("renders company details correctly", () => {
    // Render the component with a company prop
    render(
      <Router>
        <CompanyCard company={companies[0]} />
      </Router>
    );

    // Check if the company data is displayed correctly
    expect(screen.getByText("AgroFuture Corporation")).toBeInTheDocument();
    expect(
      screen.getByText("505 Harvest Road, Des Moines, IA 50309")
    ).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  test("handles mouse enter and leave events", () => {
    const { container } = render(
      <Router>
        <CompanyCard company={companies[0]} />
      </Router>
    );

    const card = container.querySelector(".MuiCard-root");

    // Simulate mouse enter event
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle("transform: scale(1.05)");
    expect(card).toHaveStyle("box-shadow: 0px 8px 20px rgba(50, 50, 50, 0.4)");

    // Simulate mouse leave event
    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle("transform: scale(1)");
    expect(card).toHaveStyle("box-shadow: 0px 4px 10px rgba(50, 50, 50, 0.2)");
  });

  test("navigates to the company details page on button click", () => {
    render(
      <Router>
        <CompanyCard company={companies[0]} />
      </Router>
    );

    const button = screen.getByText(/view details/i);
    fireEvent.click(button);

    // Check the navigation
    expect(window.location.pathname).toBe(`/company/1`);
  });
});
