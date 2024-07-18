import Button from "@components/commons/button/Button";
import { SHOW_TYPE, SHOW_TYPE_KEY, ShowTypes } from "@pages/gig/constants";
import { useNavigate } from "react-router-dom";
import { RegisteredObjProps } from "../../constants/myRegisterShow";
import * as S from "./RegisteredCard.styled";

const RegisteredCard = ({
  param,
  performanceTitle,
  performancePeriod,
  genre,
  posterImage,
}: Omit<RegisteredObjProps, "performanceId">) => {
  const navigate = useNavigate();
  //공연 수정하기 뷰 연결하고 나면 url 변경해야할 수도 있음
  // 또한, 파라미터를 넘겨서 조회할 수 있도록 url에 파라미터를 추가해야할 수 있음.
  const handleModifiyBtn = () => {
    const url = `/gig-modify-manage/${param}`;
    window.location.assign(url);
  };

  const handleGuestListBtn = () => {
    const url = `/guest-manage/${param}`;
    window.location.assign(url);
  };

  const getShowTypeText = (key: SHOW_TYPE_KEY): ShowTypes => SHOW_TYPE[key];

  return (
    <S.CardWrapper>
      <S.CardImg imgsrc={posterImage ?? ""} />
      <S.CardInfo>
        <S.CardInfoTextBox>
          <S.CardInfoTextTitleBox>
            <S.CardInfoGenreText>{getShowTypeText(genre as SHOW_TYPE_KEY)}</S.CardInfoGenreText>
            <S.CardInfoTitleText>{performanceTitle}</S.CardInfoTitleText>
          </S.CardInfoTextTitleBox>

          <S.CardInfoPeriodBox>{performancePeriod}</S.CardInfoPeriodBox>
        </S.CardInfoTextBox>
        <S.CardInfoButtonBoxWrapper>
          <S.CardInfoButtonBox>
            <Button onClick={handleModifiyBtn} size="xsmall" variant="gray" disabled={false}>
              공연정보 수정
            </Button>
            <Button onClick={handleGuestListBtn} size="xsmall" variant="line" disabled={false}>
              예매자 관리
            </Button>
          </S.CardInfoButtonBox>
        </S.CardInfoButtonBoxWrapper>
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default RegisteredCard;
