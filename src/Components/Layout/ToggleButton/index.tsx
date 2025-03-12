import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useSpring, animated } from 'react-spring';

interface ToggleButtonProps extends IconButtonProps {
  open: boolean;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { open, onClick } = props;

  const springs1 = useSpring({
    rotate: open ? '-45deg' : '0deg',
    y: open ? 5 : 0,
  });
  const springs2 = useSpring({
    rotate: open ? '45deg' : '0deg',
    y: open ? -5 : 0,
  });

  const styles = {
    width: 44,
    height: 2,
    backgroundColor: 'black',
  };

  return (
    <IconButton
      aria-label='toggle-button'
      onClick={onClick}
      sx={{ width: 56, height: 56, p: 0.75 }}
    >
      <Stack gap={1}>
        <animated.div style={{ ...styles, ...springs1 }} />
        <animated.div style={{ ...styles, ...springs2 }} />
      </Stack>
    </IconButton>
  );
};

export default ToggleButton;
