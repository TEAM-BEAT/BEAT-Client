import TokenRefresher from "@hooks/useTokenRefresher";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../commons/navigation/Navigation";

const Layout = () => {
  console.log("hi1");

  return (
    <div>
      <TokenRefresher />
      <Navigation />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default Layout;

const Main = styled.main`
  padding-top: 5.6rem;
`;
