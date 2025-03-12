'use client';

import { useCallback, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useTheme from '@mui/material/styles/useTheme';

import useCustomMediaQuery from '@/hooks/useCustomMediaQuery';
import CustomWrapper from '@/Components/Layout/CustomWrapper';
import CustomDrawer from '@/Components/Layout/CustomDrawer';
import { Box, Typography } from '@mui/material';
import CustomNavButton from '../CustomNavButton';
import { NavButton, NavButtonProps } from '@/types';

const Nav = (props: NavButtonProps) => {
  const { buttons } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();

  const { isMd } = useCustomMediaQuery();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: theme.zIndex.appBar,
      }}
    >
      <AppBar
        elevation={0}
        sx={{
          bgcolor: {
            xs: scrolled || drawerOpen ? 'var(--nav-primary)' : 'transparent',
            md: scrolled ? 'var(--nav-primary)' : 'transparent',
          },
          transition: 'background-color .25s ease-out',
        }}
      >
        <Toolbar disableGutters>
          <CustomWrapper>
            <Stack
              direction='row'
              justifyContent='space-between'
              columnGap={8.75}
              p={{ xs: '36px 0 24px', md: '30px 0' }}
            >
              <Box component='a' href='/'>
                <Typography
                  fontSize={25}
                  color={drawerOpen ? 'white' : 'var(--nav-primary)'}
                >
                  Momentum
                </Typography>
                {/* TODO ADD SVG */}
              </Box>
              {isMd ? (
                <CustomDrawer
                  buttons={buttons}
                  open={drawerOpen}
                  onOpen={handleDrawerOpen}
                  onClose={handleDrawerClose}
                />
              ) : (
                <Stack
                  direction='row'
                  width={682}
                  gap={4}
                  justifyContent='end'
                  alignItems='center'
                  display={{ xs: 'none', md: 'flex' }}
                >
                  {buttons?.map(
                    ({ text, variant, sx, prefix }: NavButton, index) => (
                      <CustomNavButton
                        key={index}
                        sx={{
                          fontFamily: "'Noto Sans Georgian', Arial, sans-serif",
                          color: 'black',
                          ...sx,
                        }}
                        variant={variant}
                        text={text}
                        prefix={prefix}
                      />
                    ),
                  )}
                </Stack>
              )}
            </Stack>
          </CustomWrapper>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
