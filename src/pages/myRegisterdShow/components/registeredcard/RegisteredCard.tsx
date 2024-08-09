import Button from "@components/commons/button/Button";
import Labal from "@components/commons/label/Labal";
import { SHOW_TYPE, SHOW_TYPE_KEY, ShowTypes } from "@pages/gig/constants";
import { useNavigate } from "react-router-dom";
import { RegisteredObjProps } from "../../constants/myRegisterShow";
import * as S from "./RegisteredCard.styled";

const RegisteredCard = ({
  param,
  performanceId,
  performanceTitle,
  performancePeriod,
  genre,
  posterImage,
}: RegisteredObjProps) => {
  const navigate = useNavigate();
  //공연 수정하기 뷰 연결하고 나면 url 변경해야할 수도 있음
  // 또한, 파라미터를 넘겨서 조회할 수 있도록 url에 파라미터를 추가해야할 수 있음.
  const handleModifiyBtn = () => {
    navigate(`/gig-modify-manage/${param}`);
  };

  const handleGuestListBtn = () => {
    navigate(`/guest-manage/${param}`);
  };

  const getShowTypeText = (key: SHOW_TYPE_KEY): ShowTypes => SHOW_TYPE[key];

  const calculateDueDate = (dateString: string): number => {
    // 문자열이 '~'을 포함하는지 확인
    const endDateStr = dateString.includes("~")
      ? dateString.split("~")[1].trim()
      : dateString.trim();

    // 문자열을 Date 객체로 변환
    const endDate = new Date(endDateStr);

    // 현재 날짜를 얻음
    const currentDate = new Date();

    // 두 날짜 간의 차이를 계산 (밀리초 단위)
    const timeDifference = endDate.getTime() - currentDate.getTime();

    // 밀리초를 일 단위로 변환
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference;
  };

  const dueDate = calculateDueDate(performancePeriod);

  return (
    <S.CardWrapper>
      <Labal dueDate={dueDate} />
      <S.CardImg
        imgsrc={posterImage ?? ""}
        onClick={() => {
          navigate(`/gig/${performanceId}`);
        }}
      />
      <S.CardInfo>
        <S.CardInfoTextBox
          onClick={() => {
            navigate(`/gig/${performanceId}`);
          }}
        >
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
