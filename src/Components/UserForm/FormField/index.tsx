import React, { useEffect } from 'react';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {
  TextField,
  MenuItem,
  InputAdornment,
  Typography,
  Box,
  Button,
} from '@mui/material';
import ImageUpload from '@/Components/ImageUpload';
import ValidationMessages from '@/Components/UserForm/ValidationMessages';
import { FormValues, FormFieldType } from '@/types/UserFormTypes';
import Spinner from '@/Components/Spinner';
import CustomNavButton from '@/Components/Layout/CustomNavButton';

interface Props {
  field: any;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  watch: (field: keyof FormValues, defaultValue?: any) => any;
  errors: FieldErrors<FormValues>;
  value?: String;
  formState?: any;
  otherProps?: Record<string, any>;
  setValue?: UseFormSetValue<any>;
  possibleErrors?: any;
}

const FormField: React.FC<Props> = ({
  field,
  register,
  control,
  watch,
  errors,
  value,
  formState,
  otherProps = {},
  setValue,
  possibleErrors,
}) => {
  useEffect(() => {
    if (field?.attrs?.depends_on) {
      const dependsOnValue = watch(field?.attrs?.depends_on);
      if (dependsOnValue && setValue) {
        setValue(field.name as keyof FormValues, '');
      }
    }
  }, [watch(field?.attrs?.depends_on)]);
  switch (field.type) {
    case 'select':
      return (
        <Box
          component='span'
          sx={{
            display: field?.attrs?.depends_on
              ? !watch(field?.attrs?.depends_on)
                ? 'none'
                : 'block'
              : 'block',
          }}
        >
          <TextField
            select
            label={field.label}
            variant='standard'
            margin='dense'
            fullWidth
            disabled={
              field?.attrs?.depends_on
                ? !watch(field?.attrs?.depends_on)
                : false
            }
            required
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
              '& .MuiSelect-select': {
                display: 'flex',
              },
              '& .MuiInputBase-root': {
                borderRadius: '3px',
                border: errors[field.name as keyof FormValues]
                  ? '1px solid red'
                  : formState.touchedFields[field.name as keyof FormValues]
                    ? '1px solid green'
                    : '1px solid #D3D3D3',
              },
            }}
            {...otherProps}
          >
            <Spinner isLoading={field?.isLoading ?? false} />
            {field?.addButton?.display && (
              <Button
                sx={{
                  cursor: 'pointer',
                  color: 'var(--primary)',
                  ml: 5.5,
                  my: 1,
                  position: 'relative',
                  fontFamily: '"Fredoka One", cursive',
                }}
                onClick={field.addButton.onClick}
              >
                {' '}
                <Box
                  position='absolute'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  left={-28}
                  width={20}
                  height={20}
                  border='1px solid var(--primary)'
                  borderRadius='50%'
                >
                  +{' '}
                </Box>{' '}
                {field.addButton.text}
              </Button>
            )}
            {field.options?.map((option: any) => {
              if (
                field?.attrs?.filter_by &&
                watch(field?.attrs?.filter_by) !== option.department_id
              ) {
                return;
              }

              return (
                <MenuItem
                  sx={{ display: 'flex' }}
                  key={option.label}
                  value={option.value}
                >
                  {option?.icon && (
                    <img
                      src={option.icon}
                      loading='lazy'
                      width={20}
                      height={20}
                      style={{ marginRight: '10px' }}
                    />
                  )}
                  {option?.avatar && (
                    <img
                      src={option.avatar}
                      loading='lazy'
                      width={20}
                      height={20}
                      style={{ marginRight: '10px', borderRadius: '50%' }}
                    />
                  )}
                  <Typography>{option.label}</Typography>
                </MenuItem>
              );
            })}
          </TextField>
          <ValidationMessages
            fieldName={field.name as keyof FormValues}
            field={field}
            watch={watch}
            possibleErrors={possibleErrors}
          />
        </Box>
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
          {...otherProps}
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
            {...otherProps}
          />
          <ValidationMessages
            fieldName={field.name as keyof FormValues}
            field={field}
            watch={watch}
            possibleErrors={possibleErrors}
          />
        </>
      );
    case 'date':
      return (
        <>
          <TextField
            type='date'
            label={field.label}
            variant='standard'
            fullWidth
            margin='dense'
            InputLabelProps={{ shrink: true }} // Keeps label above the input
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
            {...otherProps}
          />
          <ValidationMessages
            fieldName={field.name as keyof FormValues}
            field={field}
            watch={watch}
            possibleErrors={possibleErrors}
          />
        </>
      );
  }
};

export default FormField;
