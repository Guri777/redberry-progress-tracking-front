import React from 'react';
import { Box, Typography } from '@mui/material';

interface SelectedFiltersSectionProps {
  filters?: string[];
  removeFilter: (filter: string) => void;
  removeAllFilters: () => void;
}

const SelectedFiltersSection: React.FC<SelectedFiltersSectionProps> = ({
  filters,
  removeFilter,
  removeAllFilters,
}) => {
  return (
    <Box display='flex' flexWrap='wrap' gap={2} mb={5}>
      {filters?.map((filterName, index) => (
        <Typography
          p='8px 16px'
          fontSize={12}
          borderRadius={20}
          border='2px solid var(--card-border)'
          key={index}
        >
          {filterName}{' '}
          <Box
            onClick={() => removeFilter(filterName)}
            component='span'
            sx={{ cursor: 'pointer' }}
          >
            X
          </Box>
        </Typography>
      ))}
      <Typography
        onClick={removeAllFilters}
        p='8px 16px'
        fontFamily="'Noto Sans Georgian', Arial, sans-serif"
        fontSize={12}
        sx={{ cursor: 'pointer' }}
      >
        გასუფთავება
      </Typography>
    </Box>
  );
};

export default SelectedFiltersSection;
