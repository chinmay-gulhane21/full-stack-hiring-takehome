import { render, screen, fireEvent } from "@testing-library/react";
import CompanyLocationCard from "./CompanyLocationCard";

const locations = [
  {
    location_id: "7",
    company_id: "3",
    name: "OceanView Main Port",
    address: "789 Harbor Blvd, Miami, FL 33131",
    latitude: "25.7617",
    longitude: "-80.1918",
  },
  {
    location_id: "8",
    company_id: "3",
    name: "OceanView Gulf Center",
    address: "321 Bayou Street, New Orleans, LA 70130",
    latitude: "29.9511",
    longitude: "-90.0715",
  },
];

describe("CompanyLocationCard Component", () => {
  test("renders location details correctly", () => {
    // Render the component
    render(
      <CompanyLocationCard
        location={locations[0]}
        selectedLocation={locations[0]}
      />
    );

    // Check if the location data is displayed correctly
    expect(screen.getByText("OceanView Main Port")).toBeInTheDocument();
    expect(
      screen.getByText("789 Harbor Blvd, Miami, FL 33131")
    ).toBeInTheDocument();
  });

  test("handles mouse enter and leave events", () => {
    // Render the component
    const { container } = render(
      <CompanyLocationCard
        location={locations[0]}
        selectedLocation={locations[0]}
      />
    );

    const card = container.querySelector(".MuiCard-root");

    // Simulate mouse enter event
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle("transform: scale(1.05)");
    expect(card).toHaveStyle("box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4)");

    // Simulate mouse leave event
    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle("transform: scale(1)");
    expect(card).toHaveStyle("box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2)");
  });

  test("handles click event to select location", () => {
    const handleLocationClick = jest.fn();

    render(
      <CompanyLocationCard
        location={locations[0]}
        selectedLocation={null}
        handleLocationClick={handleLocationClick}
      />
    );

    const card = screen.getByText("OceanView Main Port");
    fireEvent.click(card);

    // Check the click event handler is called with the correct location
    expect(handleLocationClick).toHaveBeenCalledWith(locations[0]);
  });

  test("applies selected location style", () => {
    render(
      <CompanyLocationCard
        location={locations[0]}
        selectedLocation={locations[0]}
      />
    );

    const card = screen
      .getByText("OceanView Main Port")
      .closest(".location-card");

    // Check if the selected location style is applied
    expect(card).toHaveClass("selected-location");
  });
});
