import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Companies App
          </Typography>
          <Button
            className="header-button"
            color="inherit"
            onClick={handleHomeClick}
          >
            Home
          </Button>
          <Button
            className="header-button"
            color="inherit"
            href="https://app.swaggerhub.com/apis/CHINMAYGULHANE_1/Company/1.0.0#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
