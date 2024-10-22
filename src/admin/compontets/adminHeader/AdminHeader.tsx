import { useEffect } from "react";
import * as S from "./AdminHeader.styled";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const userData = localStorage?.getItem("user");

  useEffect(() => {
    const userObj = JSON.parse(userData);

    if (userObj === null || userObj.role !== "ROLE_ADMIN") {
      navigate("/admin/notfound");
    }
  }, []);

  return (
    <S.AdminHeaderWrapper>
      <S.LogoIcon />
      <S.ProfileIcon />
    </S.AdminHeaderWrapper>
  );
}

export default AdminHeader;
