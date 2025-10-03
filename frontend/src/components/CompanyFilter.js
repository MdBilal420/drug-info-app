import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSelectedCompany, 
  clearFilter, 
  fetchDrugs 
} from '../redux/drugSlice';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box,
  Chip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const CompanyFilter = () => {
  const dispatch = useDispatch();
  const { companies, selectedCompany } = useSelector((state) => state.drugs);

  const handleCompanyChange = (event) => {
    const company = event.target.value;
    dispatch(setSelectedCompany(company));
    dispatch(fetchDrugs(company));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
    dispatch(fetchDrugs());
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'stretch', sm: 'center' },
      gap: 2, 
      mb: 3,
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterListIcon sx={{ color: 'primary.main' }} />
        <span style={{ fontWeight: 500, color: '#2c3e50' }}>Filter</span>
      </Box>
      
      <FormControl 
        size="small" 
        sx={{ 
          minWidth: 200,
          flex: 1
        }}
      >
        <InputLabel id="company-filter-label">Select Company</InputLabel>
        <Select
          labelId="company-filter-label"
          id="company-filter"
          value={selectedCompany || ''}
          onChange={handleCompanyChange}
          label="Select Company"
        >
          <MenuItem value="">
            <em>All Companies</em>
          </MenuItem>
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {selectedCompany && (
        <Chip 
          label={`Filtered by: ${selectedCompany}`} 
          onDelete={handleClearFilter}
          color="primary"
          variant="outlined"
          sx={{ 
            height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
              py: 1
            }
          }}
        />
      )}
    </Box>
  );
};

export default CompanyFilter;