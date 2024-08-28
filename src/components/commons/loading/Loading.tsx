import * as S from "./Loading.styled";
import LoadingAnimation from "./LoadingAnimation";

const Loading = () => {
  return (
    <S.Overlay>
      <S.LoadingWraper>
        <LoadingAnimation />
        <S.LoadingText>비트 타고 이동하는 중~</S.LoadingText>
      </S.LoadingWraper>
    </S.Overlay>
  );
};

export default Loading;
