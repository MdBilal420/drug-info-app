import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react';
import CompanyFilter from './CompanyFilter';
import drugReducer from '../redux/drugSlice';

// Mock the API calls
jest.mock('../services/api', () => ({
  getTableConfig: jest.fn(),
  getCompanies: jest.fn(),
  getDrugs: jest.fn()
}));

describe('CompanyFilter', () => {
  let store;
  
  const renderWithProviders = (ui, { preloadedState } = {}) => {
    store = configureStore({
      reducer: {
        drugs: drugReducer
      },
      preloadedState
    });
    
    return render(
      <Provider store={store}>
        {ui}
      </Provider>
    );
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders company filter dropdown with companies', () => {
    const preloadedState = {
      drugs: {
        companies: ['Company A', 'Company B', 'Company C'],
        selectedCompany: null,
        drugs: [],
        tableConfig: { columns: [] },
        status: 'succeeded',
        error: null
      }
    };

    act(() => {
      renderWithProviders(<CompanyFilter />, { preloadedState });
    });

    // Check if the filter dropdown is rendered
    expect(screen.getByLabelText('Filter by Company')).toBeInTheDocument();
  });

  test('dispatches setSelectedCompany and fetchDrugs when company is selected', () => {
    const preloadedState = {
      drugs: {
        companies: ['Company A', 'Company B'],
        selectedCompany: null,
        drugs: [],
        tableConfig: { columns: [] },
        status: 'succeeded',
        error: null
      }
    };

    renderWithProviders(<CompanyFilter />, { preloadedState });

    // Select a company
    act(() => {
      fireEvent.mouseDown(screen.getByLabelText('Filter by Company'));
    });
    
    // Click on the first company option
    act(() => {
      fireEvent.click(screen.getAllByRole('option')[0]);
    });

    // Check if the selected company is set in the store
    const state = store.getState();
    expect(state.drugs.selectedCompany).toBe('Company A');
  });

  test('clear filter button is displayed and works correctly', () => {
    const preloadedState = {
      drugs: {
        companies: ['Company A', 'Company B'],
        selectedCompany: 'Company A',
        drugs: [],
        tableConfig: { columns: [] },
        status: 'succeeded',
        error: null
      }
    };

    renderWithProviders(<CompanyFilter />, { preloadedState });

    // Check if clear filter button is displayed when a company is selected
    expect(screen.getByRole('button', { name: 'Clear Filter' })).toBeInTheDocument();

    // Click the clear filter button
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Clear Filter' }));
    });

    // Check if the selected company is cleared
    const state = store.getState();
    expect(state.drugs.selectedCompany).toBeNull();
  });

  test('clear filter button is not displayed when no company is selected', () => {
    const preloadedState = {
      drugs: {
        companies: ['Company A', 'Company B'],
        selectedCompany: null,
        drugs: [],
        tableConfig: { columns: [] },
        status: 'succeeded',
        error: null
      }
    };

    act(() => {
      renderWithProviders(<CompanyFilter />, { preloadedState });
    });

    // Check that clear filter button is not displayed
    expect(screen.queryByRole('button', { name: 'Clear Filter' })).not.toBeInTheDocument();
  });
});