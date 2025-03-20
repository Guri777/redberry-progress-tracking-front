// import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CustomNavButton from '@/Components/Layout/CustomNavButton';

interface CustomDrawerButtonProps {
  href?: string;
  onClose: () => void;
  prefix?: string;
  sx?: object;
  text: string;
  variant?: 'filled' | 'outlined';
}

const CustomDrawerButton = (props: CustomDrawerButtonProps) => {
  const { href, onClose, prefix, sx, text, variant } = props;

  // const pathname = usePathname();

  const handleClick = (isSamePage: boolean) => {
    if (isSamePage) {
      onClose();
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <Box position='static' zIndex={10} sx={{ inset: 'auto 0 0 0' }}>
      <Divider sx={{ borderColor: 'black', opacity: 0.1 }} />
      <Stack alignItems='center' padding='26px 32px 36px'>
        <CustomNavButton
          onClick={() => handleClick(false)}
          prefix={prefix}
          variant={variant}
          text={text}
          sx={{
            color: 'black',
            borderColor: 'black',
            fontFamily: '"Fredoka One", cursive',
            minWidth: '80vw',
            ...sx,
          }}
        />
      </Stack>
    </Box>
  );
};

export default CustomDrawerButton;
