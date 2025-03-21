import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import { Box, Grid } from '@mui/material';
import { schema, FormValues, FormFieldType } from '@/types/UserFormTypes';
import FormField from './FormField';
import { extractValidationRules } from '@/utils/helpers';

interface Props {
  onSubmit: (data: FormValues) => void;
  formFields?: FormFieldType[];
}

const UserForm: React.FC<Props> = ({ onSubmit, formFields }) => {
  const storedFormData = JSON.parse(localStorage.getItem('userForm') || '{}');

  const filteredData = Object.fromEntries(
    Object.entries(storedFormData).filter(([key, value]) => value !== ''),
  );
  const { register, handleSubmit, setValue, watch, reset, control, formState } =
    useForm<FormValues>({
      resolver: yupResolver(schema),
      mode: 'onChange',
      defaultValues: filteredData,
    });

  const isSubmitting = useRef(false);

  useEffect(() => {
    if (isSubmitting.current) return;

    const subscription = watch((data) => {
      localStorage.setItem('userForm', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const handleFormSubmit = (data: FormValues) => {
    isSubmitting.current = true;

    localStorage.removeItem('createTaskForm');

    reset({}, { keepValues: false });

    Object.keys(filteredData).forEach((key) => delete filteredData[key]);

    isSubmitting.current = false;

    onSubmit(data);
  };

  return (
    <Box
      component='form'
      id='user-modal-submission-form'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid container rowGap={5}>
        {formFields?.map(
          (field: FormFieldType, index: React.Key | null | undefined) => (
            <Grid
              item
              xs={field.name === 'avatar' ? 12 : 6}
              sx={{ transform: index === 1 ? 'translateX(20px)' : 0 }}
              key={index}
            >
              <FormField
                field={field}
                register={register}
                value={watch(field.name as keyof FormValues)}
                control={control}
                watch={watch}
                formState={formState}
                errors={formState.errors}
                possibleErrors={extractValidationRules(schema, field.name)}
                sx={{
                  minWidth: 380,
                  input: {
                    px: 1,
                    bgcolor: 'var(--new-task-input-bg)',
                    borderRadius: '6px',
                  },
                  textarea: {
                    bgcolor: 'var(--new-task-input-bg)',
                    borderRadius: '6px',
                    px: 1,
                  },
                  '& .MuiSelect-select': {
                    bgcolor: 'var(--new-task-input-bg)',
                    display: 'flex',
                    px: 1,
                  },
                  '& .MuiInputBase-multiline': {
                    py: 0,
                  },
                }}
              />
            </Grid>
          ),
        )}
      </Grid>
    </Box>
  );
};

export default UserForm;
