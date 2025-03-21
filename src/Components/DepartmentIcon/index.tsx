import React from 'react';
import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { DEPARTMENT_COLORS } from '@/utils/consts';

interface StatusIconProps {
  title: string;
  icon?: string;
  sx?: SxProps;
}

const DepartmentIcon = (props: StatusIconProps) => {
  const { title, icon, sx } = props;

  return (
    <Grid
      container
      maxWidth='fit-content'
      gap={0.5}
      p='4px 12px 4px 4px'
      sx={sx}
    >
      {icon && (
        <Grid item pt={0.25}>
          <img src={icon} alt={title} loading='lazy' />
        </Grid>
      )}
      <Grid item>
        <Tooltip title={title} arrow>
          <Typography
            color='white'
            noWrap
            bgcolor={DEPARTMENT_COLORS[title]}
            borderRadius={15}
            sx={{
              maxWidth: '54px',
              maxHeight: 24,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              px: 2,
              pt: '8px',
              minHeight: '24px',
              fontSize: 12,
              fontFamily: '"FiraGO", sans-serif',
            }}
          >
            {title}
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default DepartmentIcon;
