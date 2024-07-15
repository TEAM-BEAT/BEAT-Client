import Lottie from "react-lottie-player";
import registerComplete from "@assets/lottie/register-complete.json";
import * as S from "./Register.styled";
import Spacing from "@components/commons/spacing/Spacing";
import Button from "@components/commons/button/Button";
import { useNavigate } from "react-router-dom";
import { REGISTER_RESPONSE } from "./constants";
import { useEffect, useState } from "react";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";

const RegisterComplete = () => {
  const user = "메이커";
  const navigate = useNavigate();
  const [response, setResponse] = useState(REGISTER_RESPONSE);
  const goGigsPage = () => navigate(`/gig/${response.performanceId}`);

  const { setHeader } = useHeader();

  const handleRightBtn = () => {
    navigate("/main");
  };

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON,
      rightOnClick: handleRightBtn,
    });
  }, [setHeader]);

  return (
    <>
      <S.RegisterCompleteLayout>
        <S.RegisterCompleteWrapper>
          <Lottie
            animationData={registerComplete}
            loop={false}
            play={true}
            style={{ width: "150px", height: "150px", margin: "0 auto" }}
          />
          <Spacing marginBottom="3.2" />
          <S.RegisterCompleteTitle>
            {user}님, <br />
            공연 등록이 완료되었어요!
          </S.RegisterCompleteTitle>
          <Spacing marginBottom="1" />
          <S.ReigsterCompleteSubTitle>
            가슴 뛰는 이야기의 시작을 축하드려요.
          </S.ReigsterCompleteSubTitle>
        </S.RegisterCompleteWrapper>
      </S.RegisterCompleteLayout>
      <S.FooterContainer>
        <Button onClick={goGigsPage}>방금 등록한 공연 보러가기 </Button>
      </S.FooterContainer>
    </>
  );
};

export default RegisterComplete;
