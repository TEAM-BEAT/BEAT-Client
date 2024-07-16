import * as S from "./Banner.styled";

interface BannerProps {
  title?: string;
  image: string;
  reservedCount: number;
  isOutdated: boolean;
}

const Banner = ({ title, image, reservedCount, isOutdated }: BannerProps) => {
  return (
    <S.BannerWrapper $image={image}>
      <S.BannerTextLayout>
        <S.BannerTextBox>
          <S.BannerTextBox>
            <S.BannerTitleText>{title}</S.BannerTitleText>
            {isOutdated ? (
              <S.BannerStateTextBox>
                총<S.CountTextSpan> {reservedCount}매 </S.CountTextSpan>
                판매 됨
              </S.BannerStateTextBox>
            ) : (
              <S.BannerStateTextBox>
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
