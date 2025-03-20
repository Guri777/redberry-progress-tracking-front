import Container, { ContainerProps } from '@mui/material/Container';
import { ChildrenType } from 'types';

type MyContainerProps = ChildrenType & ContainerProps;

const CustomWrapper = (props: MyContainerProps) => {
  const { children, sx, ...other } = props;
  return (
    <Container
      sx={{ px: { xs: 4, md: 7.5 }, maxWidth: 1800, ...sx }}
      maxWidth={false}
      {...other}
    >
      {children}
    </Container>
  );
};

export default CustomWrapper;
