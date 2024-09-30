import * as S from "./AdminNotFound.styled";
import AdminHeader from "@admin/compontets/adminHeader/AdminHeader";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";

const AdminNotFound = () => {
  return (
    <S.AdminNotFoundWrapper>
      <AdminHeader />
      <S.EmptyIcon />
      <S.Text>접근 권한이 없습니다!</S.Text>

      <AdminButton variant="brand">카카오 로그인</AdminButton>
    </S.AdminNotFoundWrapper>
  );
};

export default AdminNotFound;
