import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Grid,
  Container,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Tooltip,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import companyService from "../../services/companyService";

function CompanyListPage() {
  // State to store the list of companies
  const [companies, setCompanies] = useState([]);
  // State to store the search query
  const [search, setSearch] = useState("");
  // State to store the selected sort option
  const [sortOption, setSortOption] = useState("name");
  // State to store the sort direction
  const [sortDirection, setSortDirection] = useState("asc");
  // State to store the current page
  const [currentPage, setCurrentPage] = useState(1);
  // State to store the number of companies per page
  const [companiesPerPage, setCompaniesPerPage] = useState(9);

  // fetch all companies
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

  // Filter companies
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.address.toLowerCase().includes(search.toLowerCase())
  );

  // Sort companies
  const sortedCompanies = filteredCompanies.sort((a, b) => {
    let comparison = 0;
    if (sortOption === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortOption === "address") {
      comparison = a.address.localeCompare(b.address);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Calculate the companies to be displayed on the current page
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  // Toggle sort between ascending and descending
  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle page size change
  const handleCompaniesPerPageChange = (event) => {
    setCompaniesPerPage(event.target.value);
    setCurrentPage(1);
  };

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
          md={4}
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
              color: "black",
              fontWeight: "bold",
            }}
          >
            Company List
          </Typography>
        </Grid>

        {/* Search Field */}
        <Grid item xs={12} md={4}>
          <TextField
            id="search-companies"
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

        <Grid item xs={12} md={4} container alignItems="center">
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="sort-by">Sort By</InputLabel>
            <Box display="flex" alignItems="center">
              <Select
                id="sort-by"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
                style={{ flexGrow: 1 }}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="address">Address</MenuItem>
              </Select>
              <Tooltip
                title={sortDirection === "asc" ? "Ascending" : "Descending"}
              >
                <IconButton onClick={toggleSortDirection} size="small">
                  {sortDirection === "asc" ? (
                    <FontAwesomeIcon icon={faArrowUp} fontSize="inherit" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} fontSize="inherit" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {currentCompanies.map((company) => (
          <CompanyCard key={company.company_id} company={company} />
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center" alignItems="center">
        <FormControl
          variant="outlined"
          margin="normal"
          style={{ minWidth: 120 }}
        >
          <InputLabel htmlFor="page-size">Page Size</InputLabel>
          <Select
            id="page-size"
            value={companiesPerPage}
            onChange={handleCompaniesPerPageChange}
            label="Companies Per Page"
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.ceil(sortedCompanies.length / companiesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}

export default CompanyListPage;
