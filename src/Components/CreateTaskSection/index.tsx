import React from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import CustomNavButton from '../Layout/CustomNavButton';
import { useFetchQuery } from '@/hooks/API/useQuery';
import Spinner from '../Spinner';
import { usePostMutation } from '@/hooks/API/usePostMutation';
import { base64ToFile } from '@/utils/helpers';
import CreateTaskForm from './CreateTaskForm';
import { Department, FormFieldType, FormValues } from './types';
import { Employee, Priority, Status } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface CreateTaskSectionProps {
  openUserModal: () => void;
}

const CreateTaskSection: React.FC<CreateTaskSectionProps> = ({
  openUserModal,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsIsLoading,
  } = useFetchQuery<Department[]>('departments', '/departments');

  const {
    data: priorities,
    error: prioritiesError,
    isLoading: prioritiesIsLoading,
  } = useFetchQuery<Priority[]>('priorities', '/priorities');
  const {
    data: statuses,
    error: statusesError,
    isLoading: statusesIsLoading,
  } = useFetchQuery<Status[]>('statuses', '/statuses');

  const {
    data: employees,
    error: employeesError,
    isLoading: employeesIsLoading,
  } = useFetchQuery<Employee[]>('employees', '/employees');

  const { mutate, isPending } = usePostMutation<FormValues, FormData>('/tasks');

  const optionsError = Boolean(
    departmentsError || statusesError || employeesError || prioritiesError,
  );

  const [openSnackbar, setOpenSnackbar] = React.useState(false); // State for success snackbar

  const formFields: FormFieldType[] = [
    { name: 'name', label: 'სათაური *', type: 'text' },
    {
      name: 'department_id',
      label: 'დეპარტამენტი ',
      type: 'select',
      options: departments?.map((department) => ({
        label: department.name,
        value: department.id,
      })),
      isLoading: departmentsIsLoading,
    },
    {
      name: 'description',
      label: 'აღწერა',
      type: 'text',
      otherProps: { multiline: true, rows: 4 },
    },
    {
      name: 'employee_id',
      label: 'პასუხისმგებელი თანამშრომელი ',
      type: 'select',

      options: employees?.map((employee) => ({
        label: employee.name + ' ' + employee.surname,
        value: employee.id,
        avatar: employee.avatar,
        department_id: employee.department.id,
      })),
      attrs: {
        depends_on: 'department_id',
        filter_by: 'department_id',
      },
      addButton: {
        display: true,
        text: 'დაამატე თანამშრომელი',
        onClick: openUserModal,
      },
      isLoading: employeesIsLoading,
    },
    {
      name: 'priority_id',
      label: 'პრიორიტეტი ',
      type: 'select',
      options: priorities?.map((priority) => ({
        label: priority.name,
        value: priority.id,
        icon: priority.icon,
      })),
      isLoading: prioritiesIsLoading,
    },
    {
      name: 'status_id',
      label: 'სტატუსი ',
      type: 'select',
      options: statuses?.map((status) => ({
        label: status.name,
        value: status.id,
      })),
      isLoading: statusesIsLoading,
    },

    {
      name: 'due_date',
      label: 'დედლაინი *',
      type: 'date',
      otherProps: {
        inputProps: { min: new Date().toISOString().split('T')[0] },
      },
    },
  ];

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      let value = data[key as keyof FormValues] as string | Blob;
      if (key === 'due_date') {
        const date = new Date(data[key]);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        value = `${year}-${month}-${day}`;
      }
      formData.append(key, value);
    });

    mutate(formData, {
      onSuccess: () => {
        setOpenSnackbar(true);
        localStorage.removeItem('createTaskForm');
        queryClient.invalidateQueries({ queryKey: ['tasks'] });

        navigate('/');
      },
      onError: (error) => {
        console.error('Error submitting form:', error.message);
      },
    });
  };

  const addTask = () => {
    const form = document.getElementById(
      'add-task-submission-form',
    ) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <Box bgcolor='var(--new-task-bg)' mt={4} borderRadius={2} pl={4} py={4}>
      <CreateTaskForm onSubmit={onSubmit} formFields={formFields} />

      <Box
        sx={{ my: 5, justifyContent: 'end', display: 'flex', maxWidth: '70vw' }}
      >
        <Spinner isLoading={isPending} />

        <CustomNavButton
          onClick={() => addTask()}
          variant='filled'
          text='დავალების შექმნა'
          sx={{
            mr: 5,
            fontFamily: '"Fredoka One", cursive',
            color: 'white',
          }}
        />
      </Box>

      <Snackbar
        open={openSnackbar || optionsError}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='success'
          sx={{
            width: '30vw',
            fontSize: 24,
            padding: 4,
            textAlign: 'center',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!optionsError && 'თანამშრომელი წარმატებით შეიქმნა!'}
          {employeesError && <Typography>{employeesError?.message}</Typography>}
          {statusesError && <Typography>{statusesError?.message}</Typography>}
          {prioritiesError && (
            <Typography>{prioritiesError?.message}</Typography>
          )}

          {departmentsError && (
            <Typography>{departmentsError?.message}</Typography>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateTaskSection;
