import Board from '@/Components/Board';
import CustomWrapper from '@/Components/Layout/CustomWrapper';
import Spinner from '@/Components/Spinner';
import { useFetchQuery } from '@/hooks/API/useQuery';
import { Task } from '@/types';
import Typography from '@mui/material/Typography';
import React from 'react';

const Home = () => {
  const { data, error, isLoading } = useFetchQuery<Task[]>('tasks', '/tasks');

  return (
    <CustomWrapper>
      <Spinner isLoading={isLoading} />

      {error && <p>Error: {error.message}</p>}

      {!isLoading && (
        <>
          <Typography mt={14} fontWeight={600} fontSize={24}>
            დავალებების გვერდი
          </Typography>
          {/* FILTERS */}
          <Board tasks={data ?? []} />
        </>
      )}
    </CustomWrapper>
  );
};

export default Home;
