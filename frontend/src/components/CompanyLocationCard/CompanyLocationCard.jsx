import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./CompanyLocationCard.css";

const CompanyLocationCard = (props) => {
  return (
    <Card
      className={`location-card ${
        props.selectedLocation &&
        props.selectedLocation.location_id === props.location.location_id
          ? "selected-location"
          : ""
      }`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
      }}
      onClick={() => props.handleLocationClick(props.location)}
    >
      <CardContent>
        <Typography variant="h6" component="h3" style={{ fontWeight: "bold" }}>
          {props.location.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.location.address}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <span className="location-card-label">Latitude:</span>{" "}
          {props.location.latitude}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <span className="location-card-label">Longitude:</span>{" "}
          {props.location.longitude}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyLocationCard;
