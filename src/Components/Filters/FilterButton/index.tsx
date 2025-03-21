import React from 'react';
import { Button, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom'; // react-router-dom-ის ჰუკი
import { FILTER_GEORGIAN_LABELS, FilterKey } from '@/utils/consts';

type FilterButtonProps = {
  filterKey: FilterKey;
  openFilter: FilterKey | null;
  handleOpenFilter: (
    event: React.MouseEvent<HTMLButtonElement>,
    filterKey: FilterKey,
  ) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  filterKey,
  openFilter,
  handleOpenFilter,
}) => {
  const [searchParams] = useSearchParams();
  const rotateAngle = openFilter === filterKey ? 180 : 0;

  const isFilterActive =
    openFilter === filterKey || searchParams.has(filterKey);

  return (
    <Button
      variant='outlined'
      sx={{
        border: 'none',
        fontSize: 16,
        color: isFilterActive ? 'var(--primary)' : 'black',
        fontFamily: '"FiraGO", sans-serif',
      }}
      onClick={(e) => handleOpenFilter(e, filterKey)}
    >
      {FILTER_GEORGIAN_LABELS[filterKey]}
      <Box
        component='span'
        sx={{
          fontSize: 10,
          transition: 'transform 0.3s ease',
          transform: `rotate(${rotateAngle}deg)`,
          ml: 0.5,
        }}
      >
        <img
          style={{ paddingTop: '6px' }}
          src={`/images/icons/accordionicon${isFilterActive ? '-primary' : ''}.svg`}
          width={20}
          height={20}
          alt='hourglass'
        />
      </Box>
    </Button>
  );
};

export default FilterButton;
