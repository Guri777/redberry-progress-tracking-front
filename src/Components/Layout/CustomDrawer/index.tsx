import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Portal } from '@mui/material';
import { useTransition, animated, easings } from 'react-spring';

import ToggleButton from '@/Components/Layout/ToggleButton';
import { NavButton } from '@/types';
import CustomDrawerButton from '../CustomDrawerButton';

interface CustomDrawerProps {
  buttons?: NavButton[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AnimatedBox = animated(Box);

const CustomDrawer = ({
  buttons,
  open,
  onOpen,
  onClose,
}: CustomDrawerProps) => {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
    document.body.style.overflow = 'auto';
  }, [pathname, onClose]);

  const toggle = () => {
    if (open) {
      onClose();
      document.body.style.overflow = 'auto';
    } else {
      onOpen();
      document.body.style.overflow = 'hidden';
    }
  };

  const transition = useTransition(open, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    config: { duration: 300, easing: easings.easeOutCirc },
  });

  return (
    <>
      <ToggleButton open={open} onClick={toggle} />
      <Portal container={() => document.getElementById('root')!}>
        {transition(
          (style, item) =>
            item && (
              <AnimatedBox style={style} position='relative' height='100%'>
                <Stack
                  component='ul'
                  height='calc(100% - 102px)'
                  gap={2}
                  m='unset'
                  pl={0}
                  sx={{ overflowY: 'auto', overflowX: 'hidden' }}
                  justifyContent={{ xs: 'start', sm: 'center' }}
                >
                  {buttons?.map(({ text, variant, sx, prefix }) => (
                    <CustomDrawerButton
                      key={text} // Ensure unique key
                      href='/'
                      onClose={onClose}
                      variant={variant}
                      sx={sx}
                      text={text}
                      prefix={prefix}
                    />
                  ))}
                </Stack>
              </AnimatedBox>
            ),
        )}
      </Portal>
    </>
  );
};

export default CustomDrawer;
