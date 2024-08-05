import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NonMbLookup.styled";

import Button from "@components/commons/button/Button";
import InputWrapper from "./components/InputWrapper";

import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";

const NonMbLookup = () => {
  const navigate = useNavigate();

  const { openAlert } = useModal();
  const { setHeader } = useHeader();

  // 하단 내역 확인 버튼 활성화/비활성화 상태
  const [btnActive, setBtnActive] = useState(false);
  // 하단 내역 확인 버튼 클릭 시 true
  const [isReadyRequest, setIsReadyRequest] = useState(false);
  // API 연결 후 들어오는 상태
  const [dataState, setDataState] = useState(0);

  const handleBtnOn = () => {
    setBtnActive(true);
  };

  const handleBtnOff = () => {
    setBtnActive(false);
  };

  const handleBtnState = () => {
    setIsReadyRequest(true);
  };

  const handleData = (status: number) => {
    setDataState(status);
  };

  const handleAlert = () => {
    openAlert({
      title: "일치하는 정보가 없습니다. \n 확인 후 다시 조회해 주세요",
      okCallback: () => {
        setIsReadyRequest(false);
        setDataState(0);
      },
    });
  };

  const handleLeftBtn = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (dataState === 404) {
      handleAlert();
    } else {
      // API 붙이면 오류 맞춰서 처리하기
      // console.log("오류 처리");
    }
  }, [dataState]);

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "비회원 예매 조회",
      leftOnClick: handleLeftBtn,
    });
  }, [setHeader]);

  return (
    <S.NonMbLookupWrapper>
      <InputWrapper
        btnOn={handleBtnOn}
        btnOff={handleBtnOff}
        isReadyRequest={isReadyRequest}
        dataStatus={handleData}
      />
      <S.BtnLayout>
        <Button variant="primary" size="xlarge" disabled={!btnActive} onClick={handleBtnState}>
          예매내역 확인하기
        </Button>
      </S.BtnLayout>
    </S.NonMbLookupWrapper>
  );
};

export default NonMbLookup;
