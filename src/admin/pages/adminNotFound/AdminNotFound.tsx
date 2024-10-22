import { useNavigate } from "react-router-dom";
import * as S from "./AdminNotFound.styled";
import AdminHeader from "@admin/compontets/adminHeader/AdminHeader";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";

import { useAtom } from "jotai";
import { navigateAtom } from "@stores";
import { requestKakaoLogin } from "@utils/kakaoLogin";

const AdminNotFound = () => {
  const navigate = useNavigate();

  const [, setNavigateUrl] = useAtom(navigateAtom);
  const user = localStorage?.getItem("user");

  const handleKakaoLogin = (url: string) => {
    setNavigateUrl(url);
    requestKakaoLogin();
  };

  return (
    <S.AdminNotFoundWrapper>
      <AdminHeader />
      <S.EmptyIcon />
      <S.Text>접근 권한이 없습니다!</S.Text>
      {JSON.parse(user) === null && (
        <AdminButton variant="brand" onClick={() => handleKakaoLogin("/admin")}>
          카카오 로그인
        </AdminButton>
      )}
    </S.AdminNotFoundWrapper>
  );
};

export default AdminNotFound;
