import Alert from "@components/commons/modal/Alert";
import Confirm from "@components/commons/modal/Confirm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import router from "@routes/Router";
import GlobalStyle from "@styles/global";
import theme from "@styles/theme";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Modal from "@components/commons/modal/Modal";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={darkTheme}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GlobalStyle />
            <RouterProvider router={router} />
            <Modal />
            <Alert />
            <Confirm />
          </LocalizationProvider>
        </ThemeProvider>
      </MuiThemeProvider>
      <div style={{ fontSize: "16px" }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
