import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyListPage from "./pages/CompanyListPage/CompayListPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage/CompanyDetailsPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="custom-padding">
        <Routes>
          <Route path="/" element={<CompanyListPage />} />
          <Route path="/company/:id" element={<CompanyDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
