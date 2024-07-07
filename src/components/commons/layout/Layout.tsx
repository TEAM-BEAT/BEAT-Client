import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>

      {/* TODO: footer 추가 */}
    </div>
  );
};

export default Layout;
