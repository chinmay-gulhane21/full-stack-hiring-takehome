import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CompanyDetailsPage from "./CompanyDetailsPage";
import companyService from "../../services/companyService";

// Mock the companyService
jest.mock("../../services/companyService");

const mockCompany = {
  id: 1,
  name: "TechNova Solutions",
};

const mockLocations = [
  {
    location_id: 1,
    name: "TechNova HQ",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    latitude: "37.7749",
    longitude: "-122.4194",
  },
  {
    location_id: 2,
    name: "TechNova R&D Center",
    address: "456 Research Park, Palo Alto, CA 94304",
    latitude: "37.4419",
    longitude: "-122.1430",
  },
];

describe("CompanyDetailsPage", () => {
  beforeEach(() => {
    // Mock the service methods to return mock data
    companyService.getCompanyById.mockResolvedValue({
      success: true,
      data: mockCompany,
    });
    companyService.getLocationsByCompanyId.mockResolvedValue({
      success: true,
      data: mockLocations,
    });
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <Router>
          <CompanyDetailsPage />
        </Router>
      );
    });
  });

  it("fetches and displays company details and locations", async () => {
    await act(async () => {
      render(
        <Router>
          <CompanyDetailsPage />
        </Router>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(mockCompany.name)).toBeInTheDocument()
    );

    // Check if the locations are displayed
    expect(screen.getByText(mockLocations[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockLocations[1].name)).toBeInTheDocument();
  });

  it("filters locations based on search input", async () => {
    await act(async () => {
      render(
        <Router>
          <CompanyDetailsPage />
        </Router>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(mockCompany.name)).toBeInTheDocument()
    );

    // Search for a location
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "HQ" },
    });

    // Check if the filtered location is displayed
    expect(screen.getByText(mockLocations[0].name)).toBeInTheDocument();
    expect(screen.queryByText(mockLocations[1].name)).not.toBeInTheDocument();
  });

  it("handles location click event", async () => {
    await act(async () => {
      render(
        <Router>
          <CompanyDetailsPage />
        </Router>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(mockCompany.name)).toBeInTheDocument()
    );

    // Click on a location
    fireEvent.click(screen.getByText(mockLocations[0].name));

    // Check if the location is highlighted (selected)
    const cardElement = screen
      .getByText(mockLocations[0].name)
      .closest(".location-card");
    expect(cardElement).toHaveClass("selected-location");
  });
});
