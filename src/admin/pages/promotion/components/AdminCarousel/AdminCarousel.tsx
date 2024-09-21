import * as S from "./AdminCarousel.styled";
import CardCarousel from "../cardCarousel/CardCarousel";

const promotionListTest = [
  {
    isExternal: false,
    performanceId: 56,
    promotionId: 5,
    promotionPhoto:
      "https://beat-dev-bucket.s3.ap-northeast-2.amazonaws.com/poster/8a8efe39-83bf-47b6-b40d-256164928ce7-poster-1723813907142",
    redirectUrl: null,
  },
  {
    isExternal: true,
    performanceId: 57,
    promotionId: 6,
    promotionPhoto:
      "https://avatars.githubusercontent.com/u/58854041?s=400&u=fdb4a8dbf5b7ec8d7f327954a4ca97e064b560ee&v=4",
    redirectUrl: "https://github.com/pepperdad",
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 7,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 7,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 7,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 7,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
];

const AdminCarousel = () => {
  return (
    <S.AdminCarouselWrapper>
      <S.Notification>
        *캐러셀은 왼쪽부터 순서대로 노출되며, 최대 7개 등록 가능합니다.
      </S.Notification>
      <S.CarouselContainer>
        {promotionListTest.map((item) => {
          return <CardCarousel carouselImg={item.promotionPhoto} redirectUrl={item.redirectUrl} />;
        })}
        {promotionListTest.length <= 6 && (
          <S.AddCarouselContainer>
            <S.AddIcon />
            <S.AddText>추가하기</S.AddText>
          </S.AddCarouselContainer>
        )}
      </S.CarouselContainer>
    </S.AdminCarouselWrapper>
  );
};

export default AdminCarousel;
