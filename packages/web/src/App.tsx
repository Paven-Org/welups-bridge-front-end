import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { LayoutSettings } from "./app/components/layout/settings";
import { SettingsProvider } from "./app/contexts/SettingsContext";
import RouterConfig from "./app/navigations/router.config";
import { ThemeProvider } from "@mui/system";
import { SnackbarProvider } from "notistack";
import welupsBridgeTheme from "./app/theme";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={welupsBridgeTheme}>
        <SettingsProvider settings={LayoutSettings}>
          <SnackbarProvider
            preventDuplicate
            maxSnack={3}
            anchorOrigin={{
              horizontal: "center",
              vertical: "top",
            }}
          >
            <BrowserRouter>
              <RouterConfig />
            </BrowserRouter>
          </SnackbarProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();

export default App;
