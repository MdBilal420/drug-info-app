import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DrugTable from './components/DrugTable';
import './App.css';

// Create a minimalist theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2ecc71',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 300,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 400,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: 'rgba(52, 152, 219, 0.05)',
          fontWeight: 500,
          fontSize: '0.9rem',
          color: '#2c3e50',
        },
        body: {
          fontSize: '0.9rem',
          color: '#34495e',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(236, 240, 241, 0.3)',
          },
          '&:hover': {
            backgroundColor: 'rgba(52, 152, 219, 0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Drug Information Database</h1>
            <p className="App-subtitle">Comprehensive pharmaceutical data at your fingertips</p>
          </header>
          <div className="container">
            <DrugTable />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;