import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CompanyListPage from "./CompayListPage";
import companyService from "../../services/companyService";

// Mock the companyService
jest.mock("../../services/companyService");

const mockCompanies = [
  {
    company_id: 1,
    name: "TechNova Solutions",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    latitude: "37.7749",
    longitude: "-122.4194",
  },
  {
    company_id: 2,
    name: "GreenLeaf Enterprises",
    address: "456 Sustainability Ave, Portland, OR 97201",
    latitude: "45.5155",
    longitude: "-122.6789",
  },
  {
    company_id: 3,
    name: "OceanView Logistics",
    address: "789 Harbor Blvd, Miami, FL 33131",
    latitude: "25.7617",
    longitude: "-80.1918",
  },
];

describe("CompanyListPage", () => {
  beforeEach(() => {
    // Mock the service methods to return mock data
    companyService.getAllCompanies.mockResolvedValue({
      success: true,
      data: mockCompanies,
    });
  });

  it("renders without crashing", async () => {
    render(
      <Router>
        <CompanyListPage />
      </Router>
    );

    // Check the title
    expect(screen.getByText(/company list/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockCompanies[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockCompanies[1].name)).toBeInTheDocument();
      expect(screen.getByText(mockCompanies[2].name)).toBeInTheDocument();
    });
  });

  it("filters companies based on search input", async () => {
    render(
      <Router>
        <CompanyListPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(mockCompanies[0].name)).toBeInTheDocument();
    });

    // Search for a company
    fireEvent.change(screen.getByPlaceholderText(/search companies/i), {
      target: { value: "GreenLeaf" },
    });

    // Check if the filtered company is displayed
    await waitFor(() => {
      expect(screen.getByText(mockCompanies[1].name)).toBeInTheDocument();
      expect(screen.queryByText(mockCompanies[0].name)).not.toBeInTheDocument();
      expect(screen.queryByText(mockCompanies[2].name)).not.toBeInTheDocument();
    });
  });
});
