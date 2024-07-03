import router from "./routes/Router";
import { RouterProvider } from "react-router-dom";
import theme from "./styles/theme";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
