import * as S from "./AdminCarousel.styled";

const AdminCarousel = () => {
  return (
    <S.AdminCarouselWrapper>
      <S.Notification>
        *캐러셀은 왼쪽부터 순서대로 노출되며, 최대 7개 등록 가능합니다.
      </S.Notification>
    </S.AdminCarouselWrapper>
  );
};

export default AdminCarousel;
