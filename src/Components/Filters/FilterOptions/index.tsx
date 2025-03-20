import React, { Fragment } from 'react';
import { FormControlLabel, Checkbox, Box } from '@mui/material';

type FilterOptionsProps = {
  filterOptions: string[];
  tempSelection: string[];
  handleCheckboxChange: (value: string) => void;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filterOptions,
  tempSelection,
  handleCheckboxChange,
}) => {
  return (
    <Box display='flex' flexDirection='column'>
      {filterOptions.map((option, index) => (
        <Fragment key={index}>
          <FormControlLabel
            control={
              <Checkbox
                checked={tempSelection.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                icon={
                  <img
                    src='/images/icons/filters-checkbox.svg'
                    width={20}
                    height={20}
                    alt='checkbox'
                  />
                }
                checkedIcon={
                  <img
                    src='/images/icons/filters-checkbox-checked.svg'
                    width={20}
                    height={20}
                    alt='checkbox-checked'
                  />
                }
              />
            }
            label={option}
          />
        </Fragment>
      ))}
    </Box>
  );
};

export default FilterOptions;
