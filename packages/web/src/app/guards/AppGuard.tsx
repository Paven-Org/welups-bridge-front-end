import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSettings from '../hooks/useSettings';

const AppGuard: React.FunctionComponent = ({ children }) => {
  const [previouseRoute, setPreviousRoute] = useState<string | undefined>(
    undefined
  );
  const { settings } = useSettings();

  const { pathname } = useLocation();
  useEffect(() => {
    if (previouseRoute !== null) {
      setPreviousRoute(pathname);
    }
  }, [pathname, previouseRoute]);

  if (
    pathname === '/' &&
    settings &&
    settings.wallet &&
    settings.wallet.length > 0
  ) {
    return (
      <Navigate
        to={{
          pathname: '/bridge',
        }}
      />
    );
  }
  if (
    pathname === '/' ||
    (settings && settings.wallet && settings.wallet.length > 0)
  )
    return <>{children}</>;
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
