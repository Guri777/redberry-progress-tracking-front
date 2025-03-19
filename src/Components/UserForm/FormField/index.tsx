import React from 'react';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import ImageUpload from '@/Components/ImageUpload';
import ValidationMessages from '@/Components/UserForm/ValidationMessages';
import { FormValues, FormFieldType } from '@/types/UserFormTypes';

interface Props {
  field: FormFieldType;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  watch: (field: keyof FormValues, defaultValue?: any) => any;
  errors: FieldErrors<FormValues>;
  value?: String;
  formState?: any;
}

const FormField: React.FC<Props> = ({
  field,
  register,
  control,
  watch,
  errors,
  value,
  formState,
}) => {
  switch (field.type) {
    case 'select':
      return (
        <TextField
          select
          label={field.label}
          variant='standard'
          margin='dense'
          fullWidth
          defaultValue={value} // Use the first option as the default
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <></>
                </InputAdornment>
              ),
            },
          }}
          {...register(field.name as keyof FormValues)}
          error={!!errors[field.name as keyof FormValues]}
          sx={{
            minWidth: '50%',
            '& .MuiInputBase-root': {
              borderRadius: '3px',
              border: errors[field.name as keyof FormValues]
                ? '1px solid red'
                : formState.touchedFields[field.name as keyof FormValues]
                  ? '1px solid green'
                  : '1px solid #D3D3D3',
            },
          }}
        >
          {field.options?.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );

    case 'file':
      return (
        <Controller
          name={field.name as keyof FormValues}
          control={control}
          render={({ field }) => (
            <>
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                errors={errors[field.name as keyof FormValues]}
              />
            </>
          )}
        />
      );

    default:
      return (
        <>
          <TextField
            variant='standard'
            label={field.label}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <></>
                  </InputAdornment>
                ),
              },
            }}
            margin='dense'
            {...register(field.name as keyof FormValues)}
            error={!!errors[field.name as keyof FormValues]}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '3px',
                border: errors[field.name as keyof FormValues]
                  ? '1px solid red'
                  : formState.touchedFields[field.name as keyof FormValues]
                    ? '1px solid green'
                    : '1px solid #D3D3D3',
              },
            }}
          />
          <ValidationMessages
            fieldName={field.name as keyof FormValues}
            watch={watch}
          />
        </>
      );
  }
};

export default FormField;
