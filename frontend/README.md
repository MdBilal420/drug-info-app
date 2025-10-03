# Drug Info Frontend

This is the frontend application for the Drug Info application. It displays drug information in a table format with filtering capabilities.

## Technologies Used

- React
- Redux Toolkit
- Material-UI
- Axios

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

- Display drug information in a table
- Filter drugs by company
- Click on company names to filter by that company
- Responsive design using Material-UI components
- Date formatting based on user's locale

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── redux/
│   ├── services/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Dependencies

- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material-UI icons
- `@reduxjs/toolkit` - Redux Toolkit for state management
- `react-redux` - React bindings for Redux
- `axios` - HTTP client for API requests
- `@fontsource/roboto` - Roboto font for Material-UI