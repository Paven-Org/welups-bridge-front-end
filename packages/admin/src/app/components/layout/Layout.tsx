// import WelupsLogo from './welups.logo';
import styles from './layout.module.css';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../appbar/AppBar';

export default function Layout({
  children,
                               }: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <Box sx={{ height: '100vh' }} className={styles.container}>
      <CssBaseline />
      <ResponsiveAppBar />
      {children}
    </Box>
  );
}
