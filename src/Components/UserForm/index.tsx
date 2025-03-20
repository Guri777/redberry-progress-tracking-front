import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFormPersist from 'react-hook-form-persist';
import { Grid } from '@mui/material';
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

  useFormPersist('userForm', { watch, setValue, storage: window.localStorage });

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem('userForm', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
    localStorage.removeItem('userForm');
    reset();
  };

  return (
    <form
      id='user-modal-submission-form'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid container spacing={2}>
        {formFields?.map(
          (field: FormFieldType, index: React.Key | null | undefined) => (
            <Grid item xs={field.name === 'avatar' ? 12 : 6} key={index}>
              <FormField
                field={field}
                register={register}
                value={watch(field.name as keyof FormValues)}
                control={control}
                watch={watch}
                formState={formState}
                errors={formState.errors}
                possibleErrors={extractValidationRules(schema, field.name)}
              />
            </Grid>
          ),
        )}
      </Grid>
    </form>
  );
};

export default UserForm;
