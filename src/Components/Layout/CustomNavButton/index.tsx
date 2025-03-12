'use client';

import { Box, Button, SxProps } from '@mui/material';

interface CustomNavButtonType {
  text: string;
  prefix?: string;
  variant?: 'filled' | 'outlined';
  sx?: SxProps;
  onClick?: () => void;
}

const CustomNavButton = (props: CustomNavButtonType) => {
  const { text, prefix, variant = 'filled', sx, onClick, ...others } = props;
  const filled = variant === 'filled';
  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: filled ? 'var(--nav-primary)' : 'transparent',
        px: 2,
        boxShadow: 'none',
        borderRadius: '.5em',
        border: '1px solid var(--nav-primary)',
        transition: 'all .5s',
        maxHeight: 38.5,
        ...sx,
        '&:hover': {
          borderRadius: 0,
        },
      }}
      {...others}
    >
      <Box fontSize={20} component='span' sx={{ flexShrink: 0 }} pr={0.5}>
        {prefix}
      </Box>
      {text}
    </Button>
  );
};

export default CustomNavButton;
