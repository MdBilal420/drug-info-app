import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

// Mock all API calls to avoid network requests
jest.mock('./services/api', () => ({
  getTableConfig: jest.fn().mockResolvedValue({ data: { columns: [] } }),
  getCompanies: jest.fn().mockResolvedValue({ data: [] }),
  getDrugs: jest.fn().mockResolvedValue({ data: [] })
}));

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});