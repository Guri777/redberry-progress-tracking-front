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
        mt: 4,
        borderRadius: 2,
        pt: 2,
        borderColor: _borderColor ?? 'inherit',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <TaskInfo task={task} />
      <CardContent sx={{ mx: 1.5 }}>
        <Typography
          variant='subtitle1'
          color='var(--task-card-title)'
          fontWeight={600}
          fontSize={15}
          sx={{ opacity: 0.8 }}
          fontFamily='"FiraGO", sans-serif'
        >
          {task.name}
        </Typography>
        <Typography
          variant='body2'
          color='var(--task-card-description)'
          fontFamily='"FiraGO", sans-serif'
        >
          {task.description}
        </Typography>
        <TaskFooter task={task} />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
