import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Task } from '@/types';
import TaskInfo from '@/Components/TaskInfo';
import TaskFooter from '@/Components/TaskFooter';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  borderColor?: string;
}

const TaskCard = ({ task, borderColor: _borderColor }: TaskCardProps) => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate('/task/' + task.id);
  };
  return (
    <Card
      variant='outlined'
      onClick={handleTaskClick}
      sx={{
        cursor: 'pointer',
        mt: 2,
        borderRadius: 2,
        pt: 2,
        borderColor: _borderColor ?? 'inherit',
      }}
    >
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
