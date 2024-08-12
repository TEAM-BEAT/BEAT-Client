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
    //문자열이 ~ 를 포함하는지 확인 (즉, 단일 문자인지 아닌지 확인)
    const endDateString = dateString.includes("~")
      ? dateString.split("~")[1].trim()
      : dateString.trim();

    //해당 날짜를 표준 형식(YYYY-MM-DD) 형식으로 변환 (물론 YYYY.MM.DD도 인식되긴 함 -표준은 아님)
    const [year, month, day] = endDateString.split(".").map(Number); //숫자로 저장
    const endDate = new Date(year, month - 1, day); //month는 0부터 시작하므로 -1 해줌

    //현재 시간을 얻은 뒤, 밀리초 계산은 배제하기 위해 연,월,일로 현재 날짜의 Date 객체 재생성
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();
    const nowDay = nowDate.getDate(); //getDay는 요일을 반환하는거니까, 헷갈리지 말자 !!
    const startDate = new Date(nowYear, nowMonth, nowDay);

    //두 날짜간의 차이를 계산
    const timeDiff = endDate.getTime() - startDate.getTime();

    //계산값을 일 단위로 변환(floor를 이용해 내림)
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  const dueDate = calculateDueDate(performancePeriod);
  return (
    <>
      <S.CardWrapper>
        <S.CardImg
          imgsrc={posterImage ?? ""}
          onClick={() => {
            navigate(`/gig/${performanceId}`);
          }}
        >
          <Labal dueDate={dueDate} />
        </S.CardImg>

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
    </>
  );
};

export default RegisteredCard;
