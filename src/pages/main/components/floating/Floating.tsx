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
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowText(false);
      } else if (currentScrollY < lastScrollY) {
        setShowText(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.Layer $width={width}>
      <S.FloatingBtnWrapper $showText={showText} onClick={handleRegister}>
        <S.TicketIcon />
        <S.FloatingText $showText={showText}>공연 등록</S.FloatingText>
      </S.FloatingBtnWrapper>
    </S.Layer>
  );
};

export default Floating;
