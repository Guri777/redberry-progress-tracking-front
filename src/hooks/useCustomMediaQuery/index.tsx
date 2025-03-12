import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery, {
  UseMediaQueryOptions,
} from '@mui/material/useMediaQuery';

const useCustomMediaQuery = (options?: UseMediaQueryOptions) => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('xs'), options);
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), options);
  const isMd = useMediaQuery(theme.breakpoints.down('md'), options);
  const isLg = useMediaQuery(theme.breakpoints.down('lg'), options);
  const isXl = useMediaQuery(theme.breakpoints.down('xl'), options);

  return { isXs, isSm, isMd, isLg, isXl };
};

export default useCustomMediaQuery;