import * as S from "./Floating.styled";
import { useNavigate } from "react-router-dom";

const Floating = () => {
  const navigate = useNavigate();

  return (
    <S.FloatingWrapper>
      <S.FloatingContainer>
        <S.UnionIcon></S.UnionIcon>
        <S.UnionText>공연을 등록해보세요!</S.UnionText>
        <S.FloatingBtnWrapper
          onClick={() => {
            navigate("/gig-register");
          }}
        >
          <S.FloatingBtn />
        </S.FloatingBtnWrapper>
      </S.FloatingContainer>
    </S.FloatingWrapper>
  );
};

export default Floating;
