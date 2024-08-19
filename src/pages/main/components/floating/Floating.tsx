import { useLogin, useModal } from "@hooks";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Floating.styled";

const Floating = () => {
  const navigate = useNavigate();
  const { isLogin } = useLogin();
  const { openAlert } = useModal();

  const handleRegister = () => {
    if (isLogin) {
      navigate("/gig-register");
    } else {
      openAlert({
        title: "로그인이 필요한 서비스입니다.",
        okText: "확인",
        okCallback: () => {
          requestKakaoLogin();
        },
      });
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.Layer $width={width}>
      <S.FloatingWrapper>
        <S.FloatingContainer>
          <S.UnionIcon></S.UnionIcon>
          <S.UnionText>공연을 등록해보세요!</S.UnionText>
          <S.FloatingBtnWrapper onClick={handleRegister}>
            <S.FloatingBtn />
          </S.FloatingBtnWrapper>
        </S.FloatingContainer>
      </S.FloatingWrapper>
    </S.Layer>
  );
};

export default Floating;
