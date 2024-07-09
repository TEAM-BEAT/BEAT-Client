import { useState } from "react";
import * as S from "./NonMbLookup.styled";

import InputWrapper from "./components/InputWrapper";
import Button from "@components/commons/button/Button";

const NonMbLookup = () => {
  const [btnActive, setBtnActive] = useState(false);

  const handleBtnOn = () => {
    setBtnActive(true);
  };

  const hadleBtnOff = () => {
    setBtnActive(false);
  };

  return (
    <S.NonMbLookupWrapper>
      <InputWrapper btnOn={handleBtnOn} btnOff={hadleBtnOff} />
      <S.BtnLayout>
        {btnActive ? (
          <Button variant="primary" size="xlarge">
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
