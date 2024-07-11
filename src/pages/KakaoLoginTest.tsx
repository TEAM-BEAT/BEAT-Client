import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Button from "@components/commons/button/Button";

import { requestKakaoCode } from "@utils/kakaoLogin";

const KakaoLoginTest = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <Test>
      <Button onClick={requestKakaoCode}>카카오 로그인 테스트~~</Button>
    </Test>
  );
};

export default KakaoLoginTest;

const Test = styled.div`
  width: 37.5rem;
  height: 66.7rem;

  background-color: white;
`;
