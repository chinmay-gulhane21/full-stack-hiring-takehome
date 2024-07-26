import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import companyService from "../../services/companyService";
import "./CompanyDetailsPage.css";
import Button from "@mui/material/Button";

// CSS style for the map container
const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

// Helper function to create a map center object from latitude and longitude
const mapCenter = (latitude, longitude) => ({
  lat: parseFloat(latitude),
  lng: parseFloat(longitude),
});

// Component to render markers on the map
const PoiMarkers = ({ pois, handleClick }) => {
  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.location_id}
          position={mapCenter(poi.latitude, poi.longitude)}
          clickable={true}
          onClick={() => handleClick(poi)}
        >
          <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
        </AdvancedMarker>
      ))}
    </>
  );
};

function CompanyDetailsPage() {
  // Get the company ID from the URL parameters
  const { id } = useParams();
  // Get the location object from React Router
  const location = useLocation();
  // State for storing company details
  const [company, setCompany] = useState(location.state?.company || null);
  // State for storing locations
  const [locations, setLocations] = useState([]);
  // State for storing the selected location
  const [selectedLocation, setSelectedLocation] = useState(null);
  // Ref to store the map instance
  const mapRef = useRef(null);

  // Fetch company details when the component mounts or the ID changes
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (!company) {
          const data = await companyService.getCompanyById(id);
          if (data.success) {
            setCompany(data.data);
          } else {
            console.error("Error fetching company details:", data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompany();
  }, [id, company]);

  // Fetch locations when the component mounts or the ID changes
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await companyService.getLocationsByCompanyId(id);
        if (data.success) {
          setLocations(data.data);
        } else {
          console.error("Error fetching locations:", data.message);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [id]);

  // Handle location click event to set the selected location and center the map
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.panTo(mapCenter(location.latitude, location.longitude));
    }
  };

  // Display loading state while fetching data
  if (!company) return <div>Loading...</div>;

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="company-name-container">
        <h1 className="company-name">{company.name}</h1>
      </div>
      <div className="company-details-container">
        <div className="details-section">
          <h2 className="location-heading">Locations</h2>
          <ul>
            {locations.map((location) => (
              <li
                key={location.location_id}
                onClick={() => handleLocationClick(location)}
                className={
                  selectedLocation &&
                  selectedLocation.location_id === location.location_id
                    ? "selected-location"
                    : ""
                }
              >
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <p>
                  Lat: {location.latitude}, Long: {location.longitude}
                </p>
              </li>
            ))}
          </ul>
          <Button
            component={Link}
            to={{
              pathname: `/`,
              state: { company },
            }}
            variant="contained"
            color="primary"
          >
            Back to List
          </Button>
        </div>
        <div className="map-container">
          <Map
            defaultZoom={13}
            defaultCenter={mapCenter(company.latitude, company.longitude)}
            mapId="compay_location_map"
            style={mapContainerStyle}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            <PoiMarkers
              pois={[company, ...locations]}
              handleClick={handleLocationClick}
            />
            {selectedLocation && (
              <InfoWindow
                position={mapCenter(
                  selectedLocation.latitude,
                  selectedLocation.longitude
                )}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div className="info-window-content">
                  <h3>{selectedLocation.name}</h3>
                  <p>{selectedLocation.address}</p>
                  {selectedLocation.company_id && (
                    <p>Company ID: {selectedLocation.company_id}</p>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}

export default CompanyDetailsPage;
