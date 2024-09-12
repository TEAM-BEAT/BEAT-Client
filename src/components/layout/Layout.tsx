import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../commons/navigation/Navigation";
import ScrollToTop from "@components/commons/scrollToTop/ScrollToTop";
import TokenRefresher from "src/hooks/useTokenRefresher";

const Layout = () => {
  return (
    <div>
      <TokenRefresher />
      <Navigation />
      <Main>
        <ScrollToTop />
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;

const Main = styled.main`
  padding-top: 5.6rem;
`;
