import Button from "@components/commons/button/Button";
import { useNavigate } from "react-router-dom";
import * as S from "./MyRegisterdShow.styled";
const MyRegisterdShow = () => {
  const navigate = useNavigate();
  //추후 공연등록하기 주소(채현) 나오면 변경 예정
  const handleBtn = () => {
    navigate("/");
  };
  return (
    <>
      {/*navigate 위치할 곳 - fix로 예상함*/}
      <S.BodyWrapper>
        <S.BodyLayout>
          <S.GrapicImg />
          <S.NothingText>아직 등록한 공연이 없어요.</S.NothingText>
        </S.BodyLayout>
      </S.BodyWrapper>
      <S.ButtonWrapper>
        <Button size="xlarge" variant="primary" disabled={false} onClick={handleBtn}>
          공연 등록하기
        </Button>
      </S.ButtonWrapper>
    </>
  );
};

export default MyRegisterdShow;
