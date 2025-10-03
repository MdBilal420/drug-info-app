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
  Button, 
  Box 
} from '@mui/material';

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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="company-filter-label">Filter by Company</InputLabel>
        <Select
          labelId="company-filter-label"
          id="company-filter"
          value={selectedCompany || ''}
          onChange={handleCompanyChange}
          label="Filter by Company"
        >
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCompany && (
        <Button variant="outlined" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      )}
    </Box>
  );
};

export default CompanyFilter;