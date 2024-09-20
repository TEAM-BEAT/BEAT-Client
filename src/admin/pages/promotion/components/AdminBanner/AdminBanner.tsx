import * as S from "./AdminBanner.styled";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";

const AdminBanner = () => {
  return (
    <S.AdminBannerWrapper>
      <S.Notification>*배너는 최대 1개만 등록 가능합니다.</S.Notification>
      <S.CardBanner>
        <S.ImgBanner>
          <S.DeleteIcon />
          <S.ImgIcon />
        </S.ImgBanner>
        <S.BannerInputWarpper>
        <AdminButton variant="line">이미지 변경</AdminButton>
      </S.BannerInputWarpper>
      </S.CardBanner>
    </S.AdminBannerWrapper>
  );
};

export default AdminBanner;
