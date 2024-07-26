import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Grid,
  Container,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CompanyCard from "../../components/CompanyCard";
import companyService from "../../services/companyService";

function CompanyListPage() {
  // State to store the list of companies
  const [companies, setCompanies] = useState([]);
  // State to store the search query
  const [search, setSearch] = useState("");

  // useEffect to fetch the list of companies from the API when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyService.getAllCompanies();
        if (data.success) {
          setCompanies(data.data);
        } else {
          console.error("Error fetching companies:", data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on the search query
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
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
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            style={{
              fontFamily: "Roboto, sans-serif",
              color: "#3f51b5",
              fontWeight: "bold",
            }}
          >
            Company List
          </Typography>
        </Grid>

        {/* Search Field */}
        <Grid item xs={12} md={6}>
          <TextField
            placeholder="Search Companies"
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

      {/* Company Cards */}
      <Grid container spacing={4}>
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.company_id} company={company} />
        ))}
      </Grid>
    </Container>
  );
}

export default CompanyListPage;
