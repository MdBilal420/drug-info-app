import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async thunk to fetch table configuration
export const fetchTableConfig = createAsyncThunk(
  'drugs/fetchTableConfig',
  async () => {
    const response = await api.getTableConfig();
    return response.data;
  }
);

// Async thunk to fetch companies
export const fetchCompanies = createAsyncThunk(
  'drugs/fetchCompanies',
  async () => {
    const response = await api.getCompanies();
    return response.data;
  }
);

// Async thunk to fetch drugs
export const fetchDrugs = createAsyncThunk(
  'drugs/fetchDrugs',
  async (companyFilter = null) => {
    const response = await api.getDrugs(companyFilter);
    return response.data;
  }
);

const initialState = {
  tableConfig: {
    columns: [],
  },
  companies: [],
  drugs: [],
  selectedCompany: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const drugSlice = createSlice({
  name: 'drugs',
  initialState,
  reducers: {
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    clearFilter: (state) => {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Table config reducers
      .addCase(fetchTableConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTableConfig.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tableConfig = action.payload;
      })
      .addCase(fetchTableConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Companies reducers
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Drugs reducers
      .addCase(fetchDrugs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrugs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drugs = action.payload;
      })
      .addCase(fetchDrugs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCompany, clearFilter } = drugSlice.actions;

export default drugSlice.reducer;