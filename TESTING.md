# Testing Documentation

This document describes the unit tests created to verify the filtering functionality in the drug-info-app.

## Frontend Tests

### CompanyFilter Component Tests

File: `frontend/src/components/CompanyFilter.test.js`

Tests implemented:
1. Renders company filter dropdown with companies
2. Dispatches setSelectedCompany and fetchDrugs when company is selected
3. Clear filter button is displayed and works correctly
4. Clear filter button is not displayed when no company is selected

These tests verify that the filtering functionality works correctly in the UI.

### App Component Tests

File: `frontend/src/App.test.js`

Tests implemented:
1. App renders without crashing

## Backend Tests

### Drug Service Tests

File: `backend/src/services/drugService.test.js`

Tests implemented:
1. getAllDrugs returns all drugs when no company filter is provided
2. getAllDrugs returns drugs filtered by company when company filter is provided
3. getCompanies returns distinct company names sorted alphabetically
4. getTableConfig returns the correct table configuration

### Drug Controller Tests

File: `backend/src/controllers/drugController.test.js`

Tests implemented:
1. getDrugs returns all drugs when no company filter is provided
2. getDrugs returns drugs filtered by company when company filter is provided
3. getDrugs returns 500 error when service throws an error

### Drug Routes Tests

File: `backend/src/routes/drugs.test.js`

Tests implemented:
1. Route responds to GET request
2. Route responds to GET request with company filter

## Running Tests

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

## Test Results

All tests are currently passing, verifying that the filtering functionality works correctly both in the frontend UI and backend API.

### Frontend Test Results
- 5 tests passed

### Backend Test Results
- 9 tests passed