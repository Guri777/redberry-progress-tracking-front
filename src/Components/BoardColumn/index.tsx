import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Status, Task } from '@/types';
import TaskCard from '@/Components/TaskCard';
import { BOARD_COLUMN_COLORS } from '@/utils/consts';

interface BoardColumnProps {
  status: Status;
  tasks: Task[];
}

const BoardColumn = ({ status, tasks }: BoardColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status.id === status.id);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box sx={{ borderRadius: 2, py: 2 }}>
        <Typography
          variant='h6'
          sx={{
            bgcolor: BOARD_COLUMN_COLORS[status.name] || '--var(primary)',
            color: 'white',
            p: 1,
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          {status.name}
        </Typography>

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            borderColor={BOARD_COLUMN_COLORS[status.name]}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default BoardColumn;
