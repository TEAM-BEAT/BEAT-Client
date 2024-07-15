import * as S from "./Loading.styled";
import Lottie from "react-lottie-player";
import loading from "@assets/lottie/loading.json";

const Loading = () => {
  return (
    <S.Overlay>
      <S.LoadingWraper>
        <Lottie animationData={loading} play={true} style={{ width: "150px", height: "150px" }} />
        <S.LoadingText>비트 타고 이동하는 중~</S.LoadingText>
      </S.LoadingWraper>
    </S.Overlay>
  );
};

export default Loading;
