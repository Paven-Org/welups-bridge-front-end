import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LayoutSettings } from './app/components/layout/settings';
import { SettingsProvider } from './app/contexts/SettingsContext';
import RouterConfig from './app/navigations/router.config';
import { ThemeProvider } from '@mui/system';
import welupsBridgeTheme from './app/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={welupsBridgeTheme}>
      <SettingsProvider settings={LayoutSettings}>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;
