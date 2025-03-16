import React from 'react';
import { Button, Box } from '@mui/material';

type ChooseButtonProps = {
  handleFilterChange: () => void;
};

const ChooseButton: React.FC<ChooseButtonProps> = ({ handleFilterChange }) => {
  return (
    <Box textAlign='right' mt={2}>
      <Button
        variant='contained'
        sx={{
          bgcolor: 'var(--primary)',
          px: 4,
          fontFamily: "'Noto Sans Georgian', Arial, sans-serif",
        }}
        size='small'
        onClick={handleFilterChange}
      >
        არჩევა
      </Button>
    </Box>
  );
};

export default ChooseButton;
