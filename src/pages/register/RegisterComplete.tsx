import registerComplete from "@assets/lottie/register-complete.json";
import Button from "@components/commons/button/Button";
import Spacing from "@components/commons/spacing/Spacing";
import { NAVIGATION_STATE } from "@constants/navigationState";
import MetaTag from "@components/commons/meta/MetaTag";
import { useHeader } from "@hooks";
import { useEffect } from "react";
import Lottie from "react-lottie-player";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Register.styled";

const RegisterComplete = () => {
  const user = "메이커";
  const navigate = useNavigate();
  const { state } = useLocation();
  const goGigsPage = () => navigate(`/gig/${state.performanceId}`);

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
      <MetaTag title="등록완료" />
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
