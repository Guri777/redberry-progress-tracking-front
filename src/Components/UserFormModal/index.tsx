import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import CustomNavButton from '../Layout/CustomNavButton';
import UserForm from '@/Components/UserForm';
import { FormFieldType, FormValues } from '@/types/UserFormTypes';
import { useFetchQuery } from '@/hooks/API/useQuery';
import Spinner from '../Spinner';
import { usePostMutation } from '@/hooks/API/usePostMutation';
import { base64ToFile } from '@/utils/helpers';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Department {
  id: number;
  name: string;
}

const UserFormModal: React.FC<Props> = ({ open, onClose }) => {
  const {
    data: departments,
    error,
    isLoading,
  } = useFetchQuery<Department[]>('departments', '/departments');

  const { mutate, isPending } = usePostMutation<FormValues, FormData>(
    '/employees',
  );

  const queryClient = useQueryClient();

  const [openSnackbar, setOpenSnackbar] = React.useState(false); // State for success snackbar

  const formFields: FormFieldType[] = [
    { name: 'name', label: 'სახელი*', type: 'text' },
    { name: 'surname', label: 'გვარი*', type: 'text' },
    { name: 'avatar', label: 'Avatar', type: 'file' },
    {
      name: 'department_id',
      label: 'დეპარტამენტი*',
      type: 'select',
      options: departments?.map((department) => ({
        label: department.name,
        value: department.id,
      })),
    },
  ];

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    if (data.avatar) {
      const avatarFile = base64ToFile(data.avatar, 'avatar.jpeg');
      formData.append('avatar', avatarFile);
    }

    Object.keys(data).forEach((key) => {
      if (key !== 'avatar') {
        formData.append(key, data[key as keyof FormValues] as string | Blob);
      }
    });

    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employees'] });

        setOpenSnackbar(true);
        localStorage.removeItem('userForm');
        onClose();
      },
      onError: (error) => {
        console.error('Error submitting form:', error.message);
      },
    });
  };

  const addEmployee = () => {
    const form = document.getElementById(
      'user-modal-submission-form',
    ) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      {error && <p>Error: {error.message}</p>}
      {!isLoading && (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth='md'
          sx={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <DialogTitle>
            <Typography
              fontSize={30}
              fontWeight={500}
              textAlign='center'
              pt={8}
              pb={2}
            >
              თანამშრომლის დამატება
            </Typography>
            <IconButton
              aria-label='close'
              onClick={onClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              X
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ mb: 2, px: 5 }}>
            <UserForm onSubmit={onSubmit} formFields={formFields} />
          </DialogContent>

          <DialogActions sx={{ mb: 5 }}>
            <CustomNavButton
              text='გაუქმება'
              onClick={onClose}
              variant='outlined'
              sx={{
                fontFamily: '"Fredoka One", cursive',
                color: 'black',
              }}
            />
            <Spinner isLoading={isPending} />

            <CustomNavButton
              onClick={() => addEmployee()}
              variant='filled'
              text='დაამატე თანამშრომელი'
              sx={{
                mr: 4,
                fontFamily: '"Fredoka One", cursive',
                color: 'white',
              }}
            />
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={openSnackbar}
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
          თანამშრომელი წარმატებით შეიქმნა!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserFormModal;
