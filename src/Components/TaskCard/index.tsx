import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Task } from '@/types';
import TaskInfo from '@/Components/TaskInfo';
import TaskFooter from '@/Components/TaskFooter';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card variant='outlined' sx={{ mt: 2, borderRadius: 2, pt: 2 }}>
      <TaskInfo task={task} />
      <CardContent>
        <Typography variant='subtitle1' fontWeight='bold'>
          {task.name}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {task.description}
        </Typography>
        <TaskFooter task={task} />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
