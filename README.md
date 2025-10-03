# Drug Info Application

A full-stack web application for viewing and filtering drug information.

## Project Overview

This application displays pharmaceutical drug information in a table format with filtering capabilities. Users can view drug details and filter by company name.

## Technologies Used

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

### Frontend
- React
- Redux Toolkit
- Material-UI
- Axios

## Project Structure

```
drug-info-app/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Install PostgreSQL locally
   - Create a database named `druginfo`
   - Create a user with appropriate privileges
   - Update the `DATABASE_URL` in the `.env` file

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Import drug data:
   ```
   npm run seed
   ```

6. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/config` - Get table configuration
- `GET /api/companies` - Get list of all companies
- `GET /api/drugs` - Get list of drugs (with optional company filter)

## Features

- Display drug information in a responsive table
- Filter drugs by company using dropdown
- Click on company names to filter by that company
- Date formatting based on user's locale
- Loading states and error handling
- Clean, modern UI with Material-UI components

## Development

To run both servers simultaneously:

1. Start the backend server:
   ```
   cd backend && npm run dev
   ```

2. In a new terminal, start the frontend server:
   ```
   cd frontend && npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api