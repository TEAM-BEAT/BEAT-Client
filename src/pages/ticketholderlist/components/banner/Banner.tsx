import * as S from "./Banner.styled";

interface BannerProps {
  image: string;
  reservedCount: number;
  isOutdated: boolean;
}

const Banner = ({ image, reservedCount, isOutdated }: BannerProps) => {
  return (
    <S.BannerWrapper $image={image}>
      <S.BannerTextLayout>
        <S.BannerTextBox>
          <S.BannerTextBox>
            <S.BannerTitleText>실리카겔 락앤롤</S.BannerTitleText>
            {isOutdated ? (
              <S.BannerStateTextBox>
                총<S.CountTextSpan> {reservedCount}매 </S.CountTextSpan>
                판매 됨
              </S.BannerStateTextBox>
            ) : (
              <S.BannerStateTextBox>
                현재
                <S.CountTextSpan> {reservedCount}매 </S.CountTextSpan>
                예매됨
              </S.BannerStateTextBox>
            )}
          </S.BannerTextBox>
        </S.BannerTextBox>
      </S.BannerTextLayout>
    </S.BannerWrapper>
  );
};

export default Banner;
