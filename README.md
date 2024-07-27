# Full-Stack Developer Take-Home Assessment

## Overview

This project is a web application that displays a list of companies and their details, including multiple possible locations. The application features a Python backend API and a React frontend with a two-page structure and map integration. The entire application is containerized using Docker.

## Requirements

### Data Structure

The application uses two CSV files:

1. `companies.csv`:
   - Columns: `company_id`, `name`, `address`, `latitude`, `longitude`

2. `locations.csv`:
   - Columns: `location_id`, `company_id`, `name`, `address`, `latitude`, `longitude`

### Backend (Python)

1. The backend is a Django application serving as the API.
2. The following endpoints are implemented:
   - **Get all companies**: Fetches data from `companies.csv`
   - **Get company details by ID**: Fetches data from `companies.csv`
   - **Get all locations for a specific company ID**: Fetches data from `locations.csv`
3. Basic error handling and logging are implemented.
4. API Documentation is provided using Swagger. You can access it [here](https://app.swaggerhub.com/apis/CHINMAYGULHANE_1/Company/1.0.0#/).

### Frontend (React)

1. The frontend is a React application using React Router for routing with two main pages:
   - **Company List Page**
   - **Company Details Page**

2. **Company List Page**:
   - Displays a grid of companies fetched from the backend API.
   - Each company item shows basic information (name, address).
   - Includes a search/filter functionality to find companies by name.
   - Clicking on a company navigates to the Company Details Page.

3. **Company Details Page**:
   - Displays detailed information about the selected company (name, address).
   - Integrates a map component using Google Maps React to show the company's main location.
   - Fetches and displays a list of possible locations for the company.
   - Displays the locations list, including name, address, latitude, and longitude for each location.
   - Implements a user-friendly way to visualize or interact with the locations data.
   - Shows a "Back to List" button to return to the Company List Page.

4. Responsive design is implemented for both desktop and mobile views.

### Docker and Docker Compose

1. A `Dockerfile` is created for the backend application.
2. A `Dockerfile` is created for the frontend application.
3. A `docker-compose.yml` file orchestrates both the backend and frontend services.

## Setup Instructions

### Prerequisites

- Docker
- Docker Compose

### Running the Application Using Docker

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd full-stack-hiring-takehome-main
2. Navigate to the frontend directory and create an .env file with the necessary environment variables:
    ```sc
      cd frontend
    ```  
    ```sh
      REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
    ```
3. Build and start the application using Docker Compose in the root directory of the application:
   ```sh
   docker-compose up --build
4. Access the application:
   1. Frontend: http://localhost:3000
   2. Backend API: http://localhost:8000

### Running the Application Locally

#### Backend Setup

1. Ensure you have Python 3.11.7 installed.

2. Navigate to the root directory:
    ```sh
    cd <root-directory>
    ```

3. Install the dependencies:
    ```sh
    pipenv install
    ```

4. Activate the virtual environment:
    ```sh
    pipenv shell
    ```
5. Install django-cors-headers:
    ```sh
    pipenv install django-cors-headers
    ```

6. Run the Django server:
    ```sh
    python manage.py migrate
    python manage.py runserver
    ```

#### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create an .env file in the frontend directory and add the necessary environment variables:
    ```sh
    REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
    ```

4. Run the React development server:
    ```sh
    npm start
    ```

### Running Unit Tests

### Backend Tests

1. Navigate to the root directory and ensure the virtual environment is activated:
    ```sh
    cd <root-directory>
    pipenv shell
    ```

2. Install `pytest` if not already installed:
    ```sh
    pipenv install pytest
    ```

3. Run the Django tests:
    ```sh
    python manage.py test
    ```

#### Frontend Tests

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Run the React tests:
    ```sh
    npm test -- --watchAll=false
    ```
