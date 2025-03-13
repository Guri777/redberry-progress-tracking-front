import React from 'react';
import { Task } from '@/types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface TaskFooterProps {
  task: Task;
}

const TaskFooter = ({ task }: TaskFooterProps) => {
  return (
    <Grid container mt={4} alignItems='center' justifyContent='space-between'>
      <Grid item>
        <img
          src={task.employee.avatar}
          width={35}
          height={35}
          style={{ borderRadius: '50%' }}
          alt={task.employee.name}
          loading='lazy'
        />
      </Grid>
      <Grid item display='flex' justifyContent='center' alignItems='center'>
        <img
          src={task.employee.avatar}
          width={30}
          height={30}
          alt={'M'}
          loading='lazy'
        />
        <Typography>{task.total_comments}</Typography>
      </Grid>
    </Grid>
  );
};

export default TaskFooter;
