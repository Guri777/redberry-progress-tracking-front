import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Board from '@/Components/Board';
import CustomWrapper from '@/Components/Layout/CustomWrapper';
import Spinner from '@/Components/Spinner';
import Filters from '@/Components/Filters';
import { useFetchQuery } from '@/hooks/API/useQuery';
import { useFilters } from '@/hooks/useFilters';
import { Task } from '@/types';
import { FilterKey } from '@/utils/consts';
import SelectedFiltersSection from '@/Components/SelectedFiltersSection';

interface HomeProps {
  isUserModalOpen: boolean;
  setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ isUserModalOpen, setIsUserModalOpen }) => {
  useEffect(() => {
    document.title = 'Tasks';
  }, []);
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
          <Typography
            mt={17.875}
            fontWeight={600}
            fontSize={34}
            fontFamily='"FiraGO", sans-serif'
          >
            დავალებების გვერდი
          </Typography>

          <Box
            ref={containerRef}
            display='flex'
            gap={4}
            mb={5}
            mt={6.5}
            flexWrap='wrap'
            border='1px solid var(--filters-border)'
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
            <SelectedFiltersSection
              filters={allSelectedFilters}
              removeAllFilters={removeAllFilters}
              removeFilter={removeFilter}
            />
          )}
          <Suspense fallback={<Spinner isLoading={true} />}>
            <Board tasks={filteredTasks} />
          </Suspense>
        </>
      )}
    </CustomWrapper>
  );
};

export default Home;
