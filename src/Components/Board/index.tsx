import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Status, Task } from '@/types';
import { useFetchQuery } from '@/hooks/API/useQuery';
import BoardColumn from '@/Components/BoardColumn';
import Spinner from '@/Components/Spinner';

interface BoardTaskProps {
  tasks: Task[];
}

const Board = ({ tasks }: BoardTaskProps) => {
  const {
    data: statuses,
    error,
    isLoading,
  } = useFetchQuery<Status[]>('statuses', '/statuses');

  return (
    <Box sx={{ position: 'relative', minHeight: '400px' }}>
      <Spinner isLoading={isLoading} />
      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <Grid container spacing={6} py={2}>
          {statuses?.map((status) => (
            <BoardColumn key={status.id} status={status} tasks={tasks} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Board;
