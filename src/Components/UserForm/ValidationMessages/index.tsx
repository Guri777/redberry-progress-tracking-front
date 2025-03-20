import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormValues } from '@/types/UserFormTypes';

interface ValidationRule {
  name: string;
  params?: Record<string, any>;
}

interface PossibleErrors {
  field: keyof FormValues;
  type: string;
  validations: ValidationRule[];
}

interface Props {
  fieldName: keyof FormValues;
  field?: { label?: string; type?: string };
  watch: (field: keyof FormValues, defaultValue?: any) => any;
  possibleErrors?: PossibleErrors;
}

const ValidationMessages: React.FC<Props> = ({
  fieldName,
  field,
  watch,
  possibleErrors,
}) => {
  const fieldValue = watch(fieldName, '');
  let messages: { condition: boolean; message: string }[] = [];
  possibleErrors?.validations?.forEach((possibleError) => {
    let error: { condition: boolean; message: string } = {
      condition: true,
      message: '',
    };

    switch (possibleError.name) {
      case 'minLengthTest':
        const min = possibleError.params?.min ?? 4;
        if (!fieldValue) return;
        error = {
          condition: fieldValue?.length >= min,
          message: `მინიმუმ ${possibleError.params?.min ?? 4} სიმბოლო`,
        };
        break;
      case 'maxLengthTest':
        if (!fieldValue) return;
        const max = possibleError.params?.max ?? 255;
        error = {
          condition: fieldValue?.length <= max,
          message: `მაქსიმუმ ${possibleError.params?.max ?? 255} სიმბოლო`,
        };
        break;
      case 'min':
        error = {
          condition: fieldValue?.length >= possibleError.params?.min,
          message: `მინიმუმ ${possibleError.params?.min} სიმბოლო`,
        };
        break;
      case 'max':
        error = {
          condition: fieldValue?.length <= possibleError.params?.max,
          message: `მაქსიმუმ ${possibleError.params?.max} სიმბოლო`,
        };
        break;
      case 'required':
        error = {
          condition: Boolean(fieldValue),
          message: `${field?.label?.replaceAll('*', '') || (fieldName === 'name' ? 'სახელი' : 'გვარი')} აუცილებელია`,
        };
        break;
    }
    messages.push(error);
  });

  if (field?.type === 'select' || field?.type === 'date') {
    messages = [
      {
        condition: Boolean(fieldValue),
        message: `${field?.label?.replaceAll('*', '') || (fieldName === 'name' ? 'სახელი' : 'გვარი')} აუცილებელია`,
      },
    ];
  }

  return (
    <Box sx={{ mt: 1, fontSize: '14px' }}>
      {messages.map((msg, index) => (
        <Typography
          fontSize={10}
          key={index}
          style={{ color: msg.condition ? 'green' : 'red' }}
        >
          {msg.condition ? (
            <img
              style={{ transform: 'translateY(5px)' }}
              src='/images/icons/arrow-green.svg'
              width={16}
              height={16}
              alt='arror-green'
            />
          ) : (
            <img
              style={{ transform: 'translateY(5px)' }}
              src='/images/icons/arrow-red.svg'
              width={16}
              height={16}
              alt='arrow-red'
            />
          )}{' '}
          {msg.message}
        </Typography>
      ))}
    </Box>
  );
};

export default ValidationMessages;
