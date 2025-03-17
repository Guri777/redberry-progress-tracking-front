import React, { useEffect, useRef, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Board from '@/Components/Board';
import CustomWrapper from '@/Components/Layout/CustomWrapper';
import Spinner from '@/Components/Spinner';
import Filters from '@/Components/Filters';
import { useFetchQuery } from '@/hooks/API/useQuery';
import { useFilters } from '@/hooks/useFilters';
import { Task } from '@/types';
import { FilterKey } from '@/utils/consts';

const Home: React.FC = () => {
  const { data, error, isLoading } = useFetchQuery<Task[]>('tasks', '/tasks');
  const {
    openFilter,
    anchorEl,
    tempSelection,
    filteredTasks,
    availableFilters,
    allSelectedFilters,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterChange,
    handleCheckboxChange,
    removeFilter,
    removeAllFilters,
  } = useFilters(data);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    }, 1000);
  }, [containerRef, isLoading]);

  return (
    <CustomWrapper>
      <Spinner isLoading={isLoading} />
      {error && <Typography color='error'>Error: {error.message}</Typography>}

      {!isLoading && (
        <>
          <Typography mt={14} fontWeight={600} fontSize={24}>
            დავალებების გვერდი
          </Typography>

          <Box
            ref={containerRef}
            display='flex'
            gap={4}
            mb={5}
            mt={5}
            flexWrap='wrap'
            border='1px solid gray'
            borderRadius={2}
            maxWidth='fit-content'
          >
            {(Object.keys(availableFilters) as FilterKey[]).map((key) => (
              <Filters
                key={key}
                filterKey={key}
                openFilter={openFilter}
                anchorEl={anchorEl}
                tempSelection={tempSelection}
                availableFilters={availableFilters}
                containerWidth={containerWidth}
                handleOpenFilter={handleOpenFilter}
                handleCloseFilter={handleCloseFilter}
                handleFilterChange={handleFilterChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </Box>

          {allSelectedFilters && allSelectedFilters.length > 0 && (
            <Box display='flex' flexWrap='wrap' gap={2} mb={5}>
              {allSelectedFilters.map((filterName, index) => (
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
          )}
          <Board tasks={filteredTasks} />
        </>
      )}
    </CustomWrapper>
  );
};

export default Home;
