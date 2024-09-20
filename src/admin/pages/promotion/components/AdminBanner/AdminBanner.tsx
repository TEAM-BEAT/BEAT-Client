import * as S from "./AdminBanner.styled";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import LinkButton from "@admin/compontets/commons/linkButton/LinkButton";

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
          {/* TODO : 공통 인풋 버튼 생성하기 */}
          <LinkButton></LinkButton>
        </S.BannerInputWarpper>
      </S.CardBanner>
    </S.AdminBannerWrapper>
  );
};

export default AdminBanner;
