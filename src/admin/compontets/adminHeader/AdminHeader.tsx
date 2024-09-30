import { useEffect } from "react";
import * as S from "./AdminHeader.styled";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const role = localStorage?.getItem("ROLE_ADMIN");

  useEffect(() => {
    const userObj = JSON.parse(role);

    if (userObj === null) {
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
