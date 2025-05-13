import MetaTag from "@components/commons/meta/MetaTag";
import Alert from "@components/commons/modal/Alert";
import Confirm from "@components/commons/modal/Confirm";
import Modal from "@components/commons/modal/Modal";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GlobalStyle from "@styles/global";
import theme from "@styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useMixpanelPageView } from "./track/useMixpanelPageView";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import router from "./routes/Router";
import TrackProvider from "./providers/TrackProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const queryClient = new QueryClient();

  function setScreenSize() {
    const dvh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--dvh", `${dvh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  // useMixpanelPageView();

  return (
    <HelmetProvider>
      <MetaTag title="BEAT" />
      <TrackProvider>
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
      </TrackProvider>
    </HelmetProvider>
  );
}

export default App;
