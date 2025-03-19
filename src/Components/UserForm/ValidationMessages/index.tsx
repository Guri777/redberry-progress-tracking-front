import React from 'react';
import { Box, Typography } from '@mui/material';
import { FormValues } from '@/types/UserFormTypes';

interface Props {
  fieldName: keyof FormValues;
  watch: (field: keyof FormValues, defaultValue?: any) => any;
}

const ValidationMessages: React.FC<Props> = ({ fieldName, watch }) => {
  const fieldValue = watch(fieldName, '');
  const messages = [
    {
      condition: fieldValue
        ? /^[\u10A0-\u10FFa-zA-Z\s]+$/.test(fieldValue)
        : false,
      message: 'მხოლოდ ქართული და ლათინური ასოები',
    },
    {
      condition: fieldValue ? fieldValue.length >= 2 : false,
      message: 'მინიმუმ 2 სიმბოლო',
    },
    {
      condition: fieldValue ? fieldValue.length <= 255 : true,
      message: 'მაქსიმუმ 255 სიმბოლო',
    },
    {
      condition: !!fieldValue,
      message: `${fieldName === 'name' ? 'სახელი' : 'გვარი'} აუცილებელია`,
    },
  ];

  return (
    <Box sx={{ mt: 1, fontSize: '14px' }}>
      {messages.map((msg, index) => (
        <Typography
          fontSize={10}
          key={index}
          style={{ color: msg.condition ? 'green' : 'red' }}
        >
          {msg.condition ? '✔️' : '❌'} {msg.message}
        </Typography>
      ))}
    </Box>
  );
};

export default ValidationMessages;
