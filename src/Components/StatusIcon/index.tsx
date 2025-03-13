import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { STATUS_ICON_COLORS } from '@/utils/consts';

interface StatusIconProps {
  title: string;
  icon?: string;
}

const StatusIcon = (props: StatusIconProps) => {
  const { title, icon } = props;

  return (
    <Grid
      container
      borderRadius={1}
      border={`1px solid ${STATUS_ICON_COLORS[title]}`}
      maxWidth='fit-content'
      gap={0.5}
      p='4px 12px 4px 4px'
    >
      <Grid item pt={0.25}>
        <img src={icon} alt={title} loading='lazy' color='red' />
      </Grid>
      <Grid item>
        <Typography color={STATUS_ICON_COLORS[title]}>{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default StatusIcon;
