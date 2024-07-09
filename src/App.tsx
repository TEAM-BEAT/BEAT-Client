import Alert from "@components/commons/modal/Alert";
import Confirm from "@components/commons/modal/Confirm";
import router from "@routes/Router";
import GlobalStyle from "@styles/global";
import theme from "@styles/theme";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <Alert />
        <Confirm />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
