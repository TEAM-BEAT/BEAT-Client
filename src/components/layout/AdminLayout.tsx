import { Outlet } from "react-router-dom";
import AdminHeader from "@admin/compontets/adminHeader/AdminHeader";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
