import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api`;

/**
 * Fetches all companies.
 */
const getAllCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a specific company by ID.
 */
const getCompanyById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches all locations for a specific company by company ID.
 */
const getLocationsByCompanyId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${id}/locations`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const companyService = {
  getAllCompanies,
  getCompanyById,
  getLocationsByCompanyId,
};

export default companyService;
