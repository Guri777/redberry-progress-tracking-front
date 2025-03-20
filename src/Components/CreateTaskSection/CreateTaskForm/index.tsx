import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material'; // Add useTheme and useMediaQuery
import FormField from '@/Components/UserForm/FormField';
import { FormFieldType, FormValues } from '../types';
import * as yup from 'yup';
import { extractValidationRules } from '@/utils/helpers';

interface Props {
  onSubmit: (data: FormValues) => void;
  formFields?: FormFieldType[];
}
const today = new Date();
today.setHours(0, 0, 0, 0);
export const createTaskFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'სათაური უნდა იყოს მინიმუმ 3 სიმბოლო')
    .max(255, 'სათაური არ უნდა აღემატებოდეს 255 სიმბოლოს')
    .required('სათაური სავალდებულოა'),

  description: yup
    .string()
    .optional()
    .test('minLengthTest', 'აღწერა უნდა იყოს მინიმუმ 4 სიმბოლო', (value) => {
      return !value || value.length >= 4;
    })
    .test(
      'maxLengthTest',
      'აღწერა არ უნდა აღემატებოდეს 255 სიმბოლოს',
      (value) => {
        return !value || value.length <= 255;
      },
    ),
  priority_id: yup.number().required('პრიორიტეტი სავალდებულოა'),

  status_id: yup.number().required('სტატუსი სავალდებულოა'),

  department_id: yup.number().required('დეპარტამენტის არჩევა სავალდებულოა'),

  employee_id: yup
    .number()
    .required('პასუხისმგებელი თანამშრომლის არჩევა სავალდებულოა'),

  due_date: yup
    .date()
    .required('დედლაინი სავალდებულოა')
    .min(today, 'დედლაინი არ შეიძლება იყოს წარსულში'), // Disable past dates,
});

const CreateTaskForm: React.FC<Props> = ({ onSubmit, formFields }) => {
  const storedFormData = JSON.parse(
    localStorage.getItem('createTaskForm') || '{}',
  );

  const filteredData = Object.fromEntries(
    Object.entries(storedFormData).filter(([key, value]) => value !== ''),
  );
  if (!filteredData.priority_id) {
    filteredData.priority_id = 2;
  }
  if (!filteredData.status_id) {
    filteredData.status_id = 1;
  }
  if (!filteredData.due_date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    filteredData.due_date = tomorrow.toISOString().split('T')[0];
  }

  const { register, handleSubmit, setValue, watch, reset, control, formState } =
    useForm<any>({
      resolver: yupResolver(createTaskFormSchema),
      mode: 'onChange',
      defaultValues: filteredData ?? { priority_id: 1 },
    });

  useFormPersist('createTaskForm', {
    watch,
    setValue,
    storage: window.localStorage,
  });

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem('createTaskForm', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
    localStorage.removeItem('createTaskForm');
    reset();
  };

  const SHRUNK_FIELDS = ['priority_id', 'status_id'];

  // Add media query hooks
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // For small screens
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // For medium screens

  return (
    <Box
      component='form'
      id='add-task-submission-form'
      onSubmit={handleSubmit(handleFormSubmit)}
      maxWidth={{ md: '76vw' }}
    >
      <Grid
        container
        spacing={3} // Consistent spacing between fields
        maxWidth='100%' // Full width on small screens
        ml={isSmallScreen ? 0 : 1} // Adjust margin for small screens
      >
        {formFields?.map((field: FormFieldType, index) => (
          <Grid
            item
            key={index}
            xs={12} // Full width on small screens
            sm={isMediumScreen ? 6 : undefined} // Half width for medium screens
            md={SHRUNK_FIELDS.includes(field.name) ? 2.11 : 4.5} // Preserve big device layout
            mr={
              !isSmallScreen && !isMediumScreen // Preserve margin for big devices
                ? field.name === 'priority_id'
                  ? 4
                  : (index % 2 === 0 && field.name !== 'due_date') ||
                      field.name === 'status_id'
                    ? '10vw'
                    : 2
                : undefined
            }
          >
            <FormField
              field={field}
              register={register}
              otherProps={field?.otherProps ?? {}}
              value={watch(field.name as keyof FormValues)}
              control={control}
              watch={watch}
              formState={formState}
              setValue={setValue}
              errors={formState.errors}
              possibleErrors={extractValidationRules(
                createTaskFormSchema,
                field.name,
              )}
              sx={{
                maxWidth: 700,
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
        ))}
      </Grid>
    </Box>
  );
};

export default CreateTaskForm;
