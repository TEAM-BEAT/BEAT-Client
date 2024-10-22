import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AdminHeader from "@admin/compontets/adminHeader/AdminHeader";
import AdminNavBar from "@admin/compontets/adminNavBar/AdminNavBar";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Admin>
        <AdminNavBar />
        <Outlet />
      </Admin>
    </div>
  );
};

export default AdminLayout;

const Admin = styled.section`
  display: flex;
  flex-direction: row;
`;
