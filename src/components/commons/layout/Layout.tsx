import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../navigation/Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Main>
        <Outlet />
      </Main>

      {/* TODO: footer 추가 */}
    </div>
  );
};

export default Layout;

const Main = styled.main`
  padding-top: 5.6rem;
`;
