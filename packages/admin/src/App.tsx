import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LayoutSettings } from './app/components/layout/settings';
import { SettingsProvider } from './app/contexts/SettingsContext';
import RouterConfig from './app/navigations/router.config';
import { ThemeProvider } from '@mui/system';
import welupsBridgeTheme from './app/theme';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { store } from 'app/redux/store';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={welupsBridgeTheme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider settings={LayoutSettings}>
            <BrowserRouter>
              <RouterConfig />
            </BrowserRouter>
          </SettingsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
