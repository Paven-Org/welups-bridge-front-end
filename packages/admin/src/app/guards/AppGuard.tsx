import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AppGuard: React.FunctionComponent = ({ children }) => {
  const [previouseRoute, setPreviousRoute] = useState<string | undefined>(
    undefined
  );
  const { isAuthenticated } = useAuth();

  const { pathname } = useLocation();
  useEffect(() => {
    if (previouseRoute !== null) {
      setPreviousRoute(pathname);
    }
  }, [pathname, previouseRoute]);

  if (isAuthenticated) {
    if (pathname === '/') {
      return (
        <Navigate
          to={{
            pathname: '/home',
          }}
          state={{ redirectUrl: previouseRoute }}
        />
      );
    } else {
      return <>{children}</>;
    }
  }

  if (pathname === '/') return <>{children}</>;
  else {
    return (
      <Navigate
        to={{
          pathname: '/',
        }}
        state={{ redirectUrl: previouseRoute }}
      />
    );
  }
};

export default AppGuard;
