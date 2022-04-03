import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styles } from './AppBar.styles';
import WelupsLogo from '../welups.logo';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../../hooks/useAuth';
import { apiClient } from 'app/commons/axios';

const ResponsiveAppBar = () => {
  const { isAuthenticated, getUsername, logout, accessToken } = useAuth();

  React.useEffect(() => {
    const interceptor = apiClient.interceptors.request.use(async function (
      config
    ) {
      if (config && config.headers && isAuthenticated) {
        config.headers.Authorization = 'Bearer ' + accessToken;
      }

      return Promise.resolve(config);
    });

    return () => {
      apiClient.interceptors.request.eject(interceptor);
    };
  }, []);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <AppBar position='static'>
      <Container maxWidth={false} sx={styles.header}>
        <Toolbar disableGutters>
          <Link to='/'>
            <WelupsLogo />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }} component='div'>
              <Typography
                style={{ color: '#ffffff', cursor: 'pointer' }}
                onClick={handleOpenUserMenu}
              >
                {getUsername()}
              </Typography>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key='mn-logout' onClick={handleLogout}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
