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
      {/* Primary Buttons */}
      <h2>Primary</h2>
      <Button varient="primary" size="xlarge" isDisabled={false}>
        Primary XL Enabled
      </Button>
      <Button varient="primary" size="xlarge" isDisabled={true}>
        Primary XL Disabled
      </Button>
      <Button varient="primary" size="large" isDisabled={false}>
        Primary L Enabled
      </Button>
      <Button varient="primary" size="large" isDisabled={true}>
        Primary L Disabled
      </Button>
      <Button varient="primary" size="medium" isDisabled={false}>
        Primary M Enabled
      </Button>
      <Button varient="primary" size="medium" isDisabled={true}>
        Primary M Disabled
      </Button>
      <Button varient="primary" size="small" isDisabled={false}>
        Primary S Enabled
      </Button>
      <Button varient="primary" size="small" isDisabled={true}>
        Primary S Disabled
      </Button>
      <Button varient="primary" size="xsmall" isDisabled={false}>
        Primary XS Enabled
      </Button>
      <Button varient="primary" size="xsmall" isDisabled={true}>
        Primary XS Disabled
      </Button>

      {/* Line Buttons */}
      <h2>Line</h2>
      <Button varient="line" size="xlarge" isDisabled={false}>
        Line XL Enabled
      </Button>
      <Button varient="line" size="xlarge" isDisabled={true}>
        Line XL Disabled
      </Button>
      <Button varient="line" size="large" isDisabled={false}>
        Line L Enabled
      </Button>
      <Button varient="line" size="large" isDisabled={true}>
        Line L Disabled
      </Button>
      <Button varient="line" size="medium" isDisabled={false}>
        Line M Enabled
      </Button>
      <Button varient="line" size="medium" isDisabled={true}>
        Line M Disabled
      </Button>
      <Button varient="line" size="small" isDisabled={false}>
        Line S Enabled
      </Button>
      <Button varient="line" size="small" isDisabled={true}>
        Line S Disabled
      </Button>
      <Button varient="line" size="xsmall" isDisabled={false}>
        Line XS Enabled
      </Button>
      <Button varient="line" size="xsmall" isDisabled={true}>
        Line XS Disabled
      </Button>

      {/* Gray Buttons */}
      <h2>Gray</h2>
      <Button varient="gray" size="xlarge" isDisabled={false}>
        Gray XL Enabled
      </Button>
      <Button varient="gray" size="xlarge" isDisabled={true}>
        Gray XL Disabled
      </Button>
      <Button varient="gray" size="large" isDisabled={false}>
        Gray L Enabled
      </Button>
      <Button varient="gray" size="large" isDisabled={true}>
        Gray L Disabled
      </Button>
      <Button varient="gray" size="medium" isDisabled={false}>
        Gray M Enabled
      </Button>
      <Button varient="gray" size="medium" isDisabled={true}>
        Gray M Disabled
      </Button>
      <Button varient="gray" size="small" isDisabled={false}>
        Gray S Enabled
      </Button>
      <Button varient="gray" size="small" isDisabled={true}>
        Gray S Disabled
      </Button>
      <Button varient="gray" size="xsmall" isDisabled={false}>
        Gray XS Enabled
      </Button>
      <Button varient="gray" size="xsmall" isDisabled={true}>
        Gray XS Disabled
      </Button>

      {/* Blue Buttons */}
      <h2>Blue</h2>
      <Button varient="blue" size="xlarge" isDisabled={false}>
        Blue XL Enabled
      </Button>

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
