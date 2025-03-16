import React from 'react';
import { Popper, Paper, ClickAwayListener, Box } from '@mui/material';
import FilterButton from '@/Components/Filters/FilterButton';
import FilterOptions from '@/Components/Filters/FilterOptions';
import ChooseButton from '@/Components/Filters/ChooseButton';
import { FilterKey } from '@/utils/consts';

type FiltersProps = {
  filterKey: FilterKey;
  openFilter: FilterKey | null;
  anchorEl: HTMLElement | null;
  tempSelection: string[];
  availableFilters: { [key: string]: string[] };
  containerWidth: number;
  handleOpenFilter: (
    event: React.MouseEvent<HTMLButtonElement>,
    filterKey: FilterKey,
  ) => void;
  handleCloseFilter: () => void;
  handleFilterChange: (key: FilterKey) => void;
  handleCheckboxChange: (value: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  filterKey,
  openFilter,
  anchorEl,
  tempSelection,
  availableFilters,
  containerWidth,
  handleOpenFilter,
  handleCloseFilter,
  handleFilterChange,
  handleCheckboxChange,
}) => {
  const filterOptions = availableFilters[filterKey] || [];

  return (
    <Box position='relative'>
      <FilterButton
        filterKey={filterKey}
        openFilter={openFilter}
        handleOpenFilter={handleOpenFilter}
      />
      {openFilter === filterKey && (
        <Popper
          open
          anchorEl={anchorEl}
          placement='bottom-start'
          sx={{
            width: containerWidth,
            border: '1px solid var(--primary)',
            borderTop: '0px',
          }}
        >
          <ClickAwayListener onClickAway={handleCloseFilter}>
            <Paper sx={{ p: 2, minWidth: 200 }}>
              <FilterOptions
                filterOptions={filterOptions}
                tempSelection={tempSelection}
                handleCheckboxChange={handleCheckboxChange}
              />
              <ChooseButton
                handleFilterChange={() => handleFilterChange(filterKey)}
              />
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </Box>
  );
};

export default Filters;
