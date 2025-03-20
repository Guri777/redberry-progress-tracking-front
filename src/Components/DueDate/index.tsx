import React from 'react';
import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';

interface DueDateProps {
  date: string;
  sx?: SxProps;
}

const DueDate = (props: DueDateProps) => {
  const { date, sx } = props;

  return (
    <Typography fontSize={12} sx={sx} fontFamily='"FiraGO", sans-serif'>
      {date}
    </Typography>
  );
};

export default DueDate;
