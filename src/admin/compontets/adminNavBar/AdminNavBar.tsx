import * as S from "./AdminNavBar.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("promotion");

  const handleNavClick = (page) => {
    setSelected(page);
    navigate(`/admin/${page}`);
  };

  return (
    <S.AdminNavBarWrapper>
      <S.NavBtn $isSelected={selected === "promotion"} onClick={() => handleNavClick("promotion")}>
        캐러셀, 배너 관리
      </S.NavBtn>
      <S.NavBtn $isSelected={selected === "user"} onClick={() => handleNavClick("user")}>
        유저 관리
      </S.NavBtn>
      <S.NavBtn $isSelected={selected === "gig"} onClick={() => handleNavClick("gig")}>
        공연 관리
      </S.NavBtn>
      <S.NavBtn $isSelected={selected === "book"} onClick={() => handleNavClick("book")}>
        예매 관리
      </S.NavBtn>
    </S.AdminNavBarWrapper>
  );
};

export default AdminNavBar;
