import React, { useState } from 'react';
import { Task, Status } from '@/types';
import {
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Avatar,
} from '@mui/material';
import StatusIcon from '@/Components/StatusIcon';
import DepartmentIcon from '@/Components/DepartmentIcon';
import { usePostMutation } from '@/hooks/API/usePostMutation';
import { useQueryClient } from '@tanstack/react-query';
import { formatGeorgianDate } from '@/utils/helpers';

interface TaskDetailsProps {
  task: Task;
  statuses: Status[];
  taskId?: string | number;
}

interface StatusUpdatePayload {
  status_id: string | number;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  statuses,
  taskId,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | number>(
    task.status.id,
  );
  const queryClient = useQueryClient();

  // Define the mutation with proper types
  const { mutate, isPending } = usePostMutation<Status, StatusUpdatePayload>(
    `/tasks/${taskId}`,
    'PUT',
  );

  const handleStatusChange = async (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const newStatusId = event.target.value as string;
    setSelectedStatus(newStatusId);

    // Call the mutation with the correct payload type
    mutate(
      { status_id: newStatusId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [`tasks-${taskId}`] });
        },
        onError: (error) => {
          console.error('Error changing status:', error.message);
        },
      },
    );
  };

  return (
    <Grid item xs={12} sm={6}>
      <Box
        display='flex'
        mb={2}
        gap={2}
        justifyContent='start'
        alignItems='center'
      >
        <StatusIcon title={task.priority.name} icon={task.priority.icon} />
        <DepartmentIcon title={task.department.name} />
      </Box>
      <Typography variant='h4' fontWeight='600'>
        {task.name}
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        mt={4.5}
        mb={8}
        fontFamily='"FiraGO", sans-serif'
      >
        {task.description}
      </Typography>

      <Box mt={3}>
        <Typography
          variant='subtitle1'
          fontWeight={600}
          fontFamily='"FiraGO", sans-serif'
          fontSize={24}
          mb={2.25}
        >
          დავალების დეტალები
        </Typography>
        <Stack mt={2} gap={4}>
          <Grid container gap={10}>
            <Grid
              item
              width={160}
              display='flex'
              justifyContent='start'
              alignItems='center'
            >
              <img
                style={{ paddingRight: '6px' }}
                src='/images/icons/status.svg'
                width={24}
                height={24}
                alt='status'
              />{' '}
              სტატუსი
            </Grid>
            <Grid item>
              <TextField
                select
                label=''
                variant='standard'
                margin='dense'
                fullWidth
                required
                onChange={handleStatusChange}
                value={selectedStatus}
                sx={{
                  minWidth: { xs: '150px', sm: '250px' },
                  '& .MuiSelect-select': {
                    display: 'flex',
                  },
                  '& .MuiInputBase-root': {
                    borderRadius: '3px',
                    border: '1px solid #D3D3D3',

                    '&::before, &:hover::before': {
                      borderColor: 'transparent!important',
                    },
                    '&::after': {
                      borderColor: 'transparent!important',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--label-color)',
                    fontFamily: '"FiraGO", sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                {statuses.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <Typography px={2}>{name}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container gap={10}>
            <Grid
              item
              width={160}
              display='flex'
              justifyContent='start'
              alignItems='center'
            >
              <img
                style={{ paddingRight: '6px' }}
                src='/images/icons/employee.svg'
                width={24}
                height={24}
                alt='employee'
              />{' '}
              <Typography fontFamily='"FiraGO", sans-serif'>
                თანამშრომელი
              </Typography>
            </Grid>
            <Grid item display='flex'>
              <Avatar
                src={task.employee.avatar}
                sx={{ width: 50, height: 50, mr: 2 }}
              />
              <Box>
                <Typography color='text.secondary'>
                  {task.employee.department.name}
                </Typography>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {task.employee.name} {task.employee.surname}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container gap={10}>
            <Grid
              item
              width={162}
              display='flex'
              justifyContent='start'
              alignItems='center'
            >
              <img
                style={{ paddingRight: '6px' }}
                src='/images/icons/due-date.svg'
                width={24}
                height={24}
                alt='due daate'
              />{' '}
              <Typography fontFamily='"FiraGO", sans-serif'>
                დავალების ვადა
              </Typography>
            </Grid>
            <Grid item>{formatGeorgianDate(new Date(task.due_date))}</Grid>
          </Grid>
        </Stack>
      </Box>
    </Grid>
  );
};

export default TaskDetails;
