import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";
import companyService from "../../services/companyService";
import "./CompanyDetailsPage.css";
import Button from "@mui/material/Button";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyLocationCard from "../../components/CompanyLocationCard/CompanyLocationCard";
import CompanyMap from "../../components/CompanyMap/CompanyMap";
import RevenueChart from "../../components/Charts/RevenueChart";
import EmployeesPieChart from "../../components/Charts/EmployeesPieChart";

// Helper function to create a map center object from latitude and longitude
const mapCenter = (latitude, longitude) => ({
  lat: parseFloat(latitude),
  lng: parseFloat(longitude),
});

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
  const [search, setSearch] = useState("");
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
          if (data.data.length > 0) {
            setSelectedLocation(data.data[0]);
            if (mapRef.current) {
              mapRef.current.panTo(
                mapCenter(data.data[0].latitude, data.data[0].longitude)
              );
            }
          }
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

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.address.toLowerCase().includes(search.toLowerCase())
  );

  // Display loading state while fetching data
  if (!company) return <div>Loading...</div>;

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="company-name-container">
        <div style={{ width: "50%", marginLeft: "22px" }}>
          <Button
            className="action-btn"
            component={Link}
            to={{ pathname: `/`, state: { company } }}
            variant="contained"
          >
            Back to List
          </Button>
        </div>
        <div>
          <h1 className="company-name">{company.name}</h1>
        </div>
      </div>
      <div className="company-details-container">
        <div className="details-section">
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "16px" }}
          >
            {/* Title */}
            <Grid
              item
              xs={12}
              md={6}
              container
              justifyContent="flex-start"
              marginTop={2}
              className="location-header"
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Locations
              </Typography>
            </Grid>

            {/* Search Field */}
            <Grid item xs={12} md={6} className="search-location">
              <TextField
                placeholder="Search"
                variant="outlined"
                margin="normal"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* <div className="scrollable-list"> */}
          <ul>
            {filteredLocations.map((location) => (
              <CompanyLocationCard
                key={location.location_id}
                location={location}
                selectedLocation={selectedLocation}
                handleLocationClick={handleLocationClick}
              />
            ))}
          </ul>
          {/* </div> */}
        </div>
        <div className="map-container">
          <CompanyMap
            company={company}
            mapRef={mapRef}
            locations={locations}
            handleLocationClick={handleLocationClick}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </div>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="sub-heading"
      >
        Analytics
      </Typography>
      <div className="chart-container">
        <div className="emp-pie-chart">
          <EmployeesPieChart locations={locations} />
        </div>
        <div className="rev-bar-chart">
          <RevenueChart locations={locations} />
        </div>
      </div>
    </APIProvider>
  );
}

export default CompanyDetailsPage;
