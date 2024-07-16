import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../commons/navigation/Navigation";

const Layout = () => {
  return (
    <div>
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
