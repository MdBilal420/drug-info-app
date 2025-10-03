import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTableConfig, 
  fetchCompanies, 
  fetchDrugs,
  setSelectedCompany
} from '../redux/drugSlice';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert,
  Box
} from '@mui/material';
import CompanyFilter from './CompanyFilter';

const DrugTable = () => {
  const dispatch = useDispatch();
  const { tableConfig, drugs, status, error } = useSelector((state) => state.drugs);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchTableConfig());
    dispatch(fetchCompanies());
    dispatch(fetchDrugs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCompanyClick = (company) => {
    dispatch(setSelectedCompany(company));
    dispatch(fetchDrugs(company));
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity="error">
        Error: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Drug Information
      </Typography>
      
      <CompanyFilter />
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="drug table">
          <TableHead>
            <TableRow>
              {tableConfig.columns.map((column) => (
                <TableCell key={column.id}>
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {drugs.map((drug) => (
              <TableRow 
                key={`${drug.code}-${drug.launchDate}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {drug.id}
                </TableCell>
                <TableCell>{drug.code}</TableCell>
                <TableCell>{`${drug.genericName} (${drug.brandName})`}</TableCell>
                <TableCell 
                  onClick={() => handleCompanyClick(drug.company)}
                  sx={{ 
                    cursor: 'pointer', 
                    textDecoration: 'underline',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  {drug.company}
                </TableCell>
                <TableCell>{formatDate(drug.launchDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DrugTable;