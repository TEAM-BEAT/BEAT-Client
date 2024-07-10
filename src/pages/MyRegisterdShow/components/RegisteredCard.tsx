import Button from "@components/commons/button/Button";
import { RegisteredObjProps } from "../constants/myRegisterShow";
import * as S from "./RegisteredCard.styled";

const RegisteredCard = ({ title, period, genre, image }: Omit<RegisteredObjProps, "id">) => {
  return (
    <S.CardWrapper>
      <S.CardImg imgsrc={image} />
      <S.CardInfo>
        <S.CardInfoTextBox>
          <S.CardInfoTextTitleBox>
            <S.CardInfoGenreText>{genre}</S.CardInfoGenreText>
            <S.CardInfoTitleText>{title}</S.CardInfoTitleText>
          </S.CardInfoTextTitleBox>

          <S.CardInfoPeriodBox>{period}</S.CardInfoPeriodBox>
        </S.CardInfoTextBox>
        <S.CardInfoButtonBoxWrapper>
          <S.CardInfoButtonBox>
            <Button size="xsmall" variant="gray" disabled={false}>
              수정
            </Button>
            <Button size="xsmall" variant="line" disabled={false}>
              예매자 확인
            </Button>
          </S.CardInfoButtonBox>
        </S.CardInfoButtonBoxWrapper>
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default RegisteredCard;
