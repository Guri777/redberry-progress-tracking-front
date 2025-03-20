import React from 'react';
import { Task } from '@/types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';

interface TaskFooterProps {
  task: Task;
}

const TaskFooter = ({ task }: TaskFooterProps) => {
  return (
    <Grid container mt={4} alignItems='center' justifyContent='space-between'>
      <Grid item>
        <Avatar src={task.employee.avatar} sx={{ width: 35, height: 35 }} />
      </Grid>
      <Grid item display='flex' justifyContent='center' alignItems='center'>
        <img
          src='/images/icons/messages-icon.svg'
          width={20}
          height={20}
          alt={'M'}
          style={{ marginRight: '4px' }}
          loading='lazy'
        />
        <Typography>{task.total_comments}</Typography>
      </Grid>
    </Grid>
  );
};

export default TaskFooter;
