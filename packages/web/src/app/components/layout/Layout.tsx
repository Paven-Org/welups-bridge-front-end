// import WelupsLogo from './welups.logo';
import styles from './layout.module.css';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../appbar/AppBar';

export default function Layout({children}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <Box sx={{ height: '100vh' }} className={styles.container}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container maxWidth='sm'>
        <Box
          display='flex'
          alignItems='center'
          flexDirection='column'
          paddingTop='76px'
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
