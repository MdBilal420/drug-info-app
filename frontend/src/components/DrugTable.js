import React, { useEffect, useState } from 'react';
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
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert,
  Box,
  Chip,
  TablePagination
} from '@mui/material';
import CompanyFilter from './CompanyFilter';

const DrugTable = () => {
  const dispatch = useDispatch();
  const { tableConfig, drugs, status, error } = useSelector((state) => state.drugs);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchTableConfig());
    dispatch(fetchCompanies());
    dispatch(fetchDrugs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleCompanyClick = (company) => {
    setPage(0)
    dispatch(setSelectedCompany(company));
    dispatch(fetchDrugs(company));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (status === 'loading') {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        width: '100%'
      }}>
        <CircularProgress 
          color="primary" 
          size={60}
          thickness={4}
          sx={{ 
            color: '#3498db' // Brighter blue color
          }} 
        />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error: {error}
      </Alert>
    );
  }

  // Calculate column widths - ID gets 10%, Name gets 30%, others get 15% each
  const getColumnWidth = (columnId) => {
    if (columnId === 'id') {
      return '10%';
    } else if (columnId === 'name') {
      return '30%';
    } else {
      // Distribute remaining width among other columns
      const otherColumnsCount = tableConfig.columns.length - 2; // minus id and name
      const remainingWidth = 60; // 100% - 10% - 30%
      return `${remainingWidth / otherColumnsCount}%`;
    }
  };

  // Pagination
  const paginatedDrugs = drugs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <CompanyFilter />
      
      <Paper 
        sx={{ 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ overflow: 'auto', flex: 1 }}>
          <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="drug table">
            <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
              <TableRow>
                {tableConfig.columns.map((column) => (
                  <TableCell 
                    key={column.id}
                    sx={{ 
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      width: getColumnWidth(column.id),
                      backgroundColor: 'rgba(52, 152, 219, 0.05)'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDrugs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableConfig.columns.length} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No drug data available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDrugs.map((drug) => (
                  <TableRow 
                    key={`${drug.code}-${drug.launchDate}`}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(52, 152, 219, 0.05)'
                      }
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Chip 
                        label={drug.id} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'primary.light', 
                          color: 'primary.contrastText',
                          fontWeight: 500
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <strong>{drug.code}</strong>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                        {drug.genericName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
                        {drug.brandName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={drug.company}
                        onClick={() => handleCompanyClick(drug.company)}
                        size="small"
                        variant="outlined"
                        sx={{
                          cursor: 'pointer',
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={formatDate(drug.launchDate)} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'secondary.light', 
                          color: 'secondary.contrastText'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={drugs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Items per page:"
          sx={{
            '& .MuiTablePagination-select': {
              pl: 1,
              pr: 3
            },
            '& .MuiTablePagination-displayedRows': {
              m: 0
            },
            borderTop: '1px solid rgba(224, 224, 224, 1)'
          }}
        />
      </Paper>
      
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Showing {paginatedDrugs.length} of {drugs.length} records
        </Typography>
      </Box>
    </Box>
  );
};

export default DrugTable;