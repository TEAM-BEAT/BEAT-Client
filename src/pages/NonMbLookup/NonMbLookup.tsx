import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NonMbLookup.styled";

import useModal from "@hooks/useModal";

import InputWrapper from "./components/InputWrapper";
import Button from "@components/commons/button/Button";

const NonMbLookup = () => {
  const navigate = useNavigate();
  const { openAlert } = useModal();

  const [btnActive, setBtnActive] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [dataState, setDataState] = useState(0);
  const [alertState, setAlertState] = useState(false);

  const handleBtnOn = () => {
    setBtnActive(true);
  };

  const hadleBtnOff = () => {
    setBtnActive(false);
  };

  const handleBtnState = () => {
    setInputActive(true);
  };

  const handleData = (status: number) => {
    setDataState(status);
  };

  const handleAlert = () => {
    openAlert({
      title: "일치하는 정보가 없습니다. \n 확인 후 다시 조회해 주세요",
      okCallback: () => {
        setInputActive(false);
        setDataState(0);
      },
    });
  };

  useEffect(() => {
    if (dataState === 200) {
      console.log(dataState);
      navigate("/lookup");
    } else if (dataState === 404) {
      setAlertState(true);
      console.log(dataState);
      handleAlert();
    } else {
      // console.log("오류 처리");
    }
  }, [dataState]);

  return (
    <S.NonMbLookupWrapper>
      <InputWrapper
        btnOn={handleBtnOn}
        btnOff={hadleBtnOff}
        inputActive={inputActive}
        dataStatus={handleData}
      />
      <S.BtnLayout>
        {btnActive ? (
          <Button variant="primary" size="xlarge" onClick={handleBtnState}>
            예매내역 확인하기
          </Button>
        ) : (
          <Button variant="primary" size="xlarge" disabled={true}>
            예매내역 확인하기
          </Button>
        )}
      </S.BtnLayout>
    </S.NonMbLookupWrapper>
  );
};

export default NonMbLookup;
