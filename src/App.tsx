import Button from "@components/commons/Button/Button";
import router from "@routes/Router";
import GlobalStyle from "@styles/global";
import theme from "@styles/theme";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Button varient="primary" size="xlarge" isDisabled={true}>
        테스트1
      </Button>
      <Button varient="primary" size="xlarge" isDisabled={false}>
        테스트2
      </Button>

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
