import * as S from "./TicketHolderList.styled";
import eximg from "./constants/silkagel.png";
const TicketHolderList = () => {
  return (
    <S.BannerWrapper $image={eximg}>
      <S.BannerTextLayout>
        <S.BannerTextBox>
          <S.BannerTextBox>
            <S.BannerTitleText>실리카겔 락앤롤</S.BannerTitleText>
            <S.BannerStateTextBox>
              현재
              <S.CountTextSpan> 17매 </S.CountTextSpan>
              예매됨
            </S.BannerStateTextBox>
          </S.BannerTextBox>
        </S.BannerTextBox>
      </S.BannerTextLayout>
    </S.BannerWrapper>
  );
};

export default TicketHolderList;
