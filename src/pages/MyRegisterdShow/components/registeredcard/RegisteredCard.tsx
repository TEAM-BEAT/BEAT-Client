import Button from "@components/commons/button/Button";
import { useNavigate } from "react-router-dom";
import { RegisteredObjProps } from "../../constants/myRegisterShow";
import * as S from "./RegisteredCard.styled";

const RegisteredCard = ({ title, period, genre, image }: Omit<RegisteredObjProps, "id">) => {
  const navigate = useNavigate();
  //공연 수정하기 뷰 연결하고 나면 url 변경해야할 수도 있음
  // 또한, 파라미터를 넘겨서 조회할 수 있도록 url에 파라미터를 추가해야할 수 있음.
  const handleModifiyBtn = () => {
    navigate("/gig-modify-manage");
  };

  const handleGuestListBtn = () => {
    navigate("/guest-manage");
  };
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
            <Button onClick={handleModifiyBtn} size="xsmall" variant="gray" disabled={false}>
              공연정보 수정
            </Button>
            <Button onClick={handleGuestListBtn} size="xsmall" variant="line" disabled={false}>
              예매자 확인
            </Button>
          </S.CardInfoButtonBox>
        </S.CardInfoButtonBoxWrapper>
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default RegisteredCard;
