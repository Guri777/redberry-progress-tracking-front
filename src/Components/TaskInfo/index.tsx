import React from 'react';
import { Task } from '@/types';
import StatusIcon from '../StatusIcon';
import DepartmentIcon from '../DepartmentIcon';
import DueDate from '../DueDate';
import { formatDate } from '@/utils/helpers';
import Grid from '@mui/material/Grid';

interface TaskInfoProps {
  task: Task;
}

const TaskInfo = ({ task }: TaskInfoProps) => {
  return (
    <Grid
      container
      gap={1}
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
    >
      <Grid item>
        <StatusIcon title={task.priority.name} icon={task.priority.icon} />
      </Grid>
      <Grid item sx={{ transform: 'translateX(-20px)' }}>
        <DepartmentIcon title={task.department.name} />
      </Grid>
      <Grid item>
        <DueDate date={formatDate(task.due_date)} />
      </Grid>
    </Grid>
  );
};

export default TaskInfo;
