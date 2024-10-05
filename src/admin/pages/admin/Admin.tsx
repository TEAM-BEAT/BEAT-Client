import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const userData = localStorage?.getItem("user");

  useEffect(() => {
    const userObj = JSON.parse(userData);

    if (userObj.role !== "ROLE_ADMIN") {
      navigate("/admin/notfound");
    } else {
      navigate("/admin/promotion");
    }
  }, []);

  return null;
};

export default Admin;
