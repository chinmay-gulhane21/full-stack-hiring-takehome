import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={company.company_id}
        className="company-card"
      >
        <Card
          style={{
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "16px",
            transition: "transform 0.3s, box-shadow 0.3s",
            boxShadow: "0px 4px 10px rgba(50, 50, 50, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0px 8px 20px rgba(50, 50, 50, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0px 4px 10px rgba(50, 50, 50, 0.2)";
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2} height="80px">
              <Avatar
                style={{
                  marginRight: "8px",
                  color: "#fff",
                }}
                className="avatar-background"
              >
                {company.name.charAt(0)}
              </Avatar>
              <Typography
                variant="h5"
                component="h2"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {company.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="flex-start">
              <LocationOnIcon color="action" style={{ marginTop: "2px" }} />
              <Typography color="textSecondary" style={{ marginLeft: "4px" }}>
                {company.address}
              </Typography>
            </Box>
          </CardContent>
          <Box textAlign="center" mb={2}>
            <Button
              className="action-btn"
              component={Link}
              to={{
                pathname: `/company/${company.company_id}`,
                state: { company },
              }}
              variant="contained"
            >
              View Details
            </Button>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default CompanyCard;
