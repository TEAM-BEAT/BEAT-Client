import React, { useEffect, useState } from "react";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";
import { phoneNumberFilter } from "@utils/useInputFilter";

interface InputProps {
  btnOn: () => void;
  btnOff: () => void;
}

const InputWrapper = ({ btnOn, btnOff }: InputProps) => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [birthInputValue, setBirthInputValue] = useState("");
  const [numberInputValue, setNumberInputValue] = useState("");
  const [pwdInputValue, setPwdInputValue] = useState("");

  const handleChangeNameInput = (value: string) => {
    setNameInputValue(value);
  };
  const handleChangeBirthInput = (value: string) => {
    setBirthInputValue(value);
  };
  const handleChangeNumberInput = (value: string) => {
    setNumberInputValue(value);
  };
  const handleChangePwdInput = (value: string) => {
    setPwdInputValue(value);
  };

  useEffect(() => {
    if (
      nameInputValue &&
      birthInputValue.length === 6 &&
      numberInputValue.length === 13 &&
      pwdInputValue.length === 4
    ) {
      btnOn();
    } else {
      btnOff();
    }
  }, [nameInputValue, birthInputValue, numberInputValue, pwdInputValue, btnOn, btnOff]);

  return (
    <S.InputWrapperLayout>
      {/* TODO: maxLenght 있는 부분 InputField에서 글자수 보이게 / 안 보이게 조정 필요 */}
      <TextField
        type="input"
        value={nameInputValue}
        onChangeValue={handleChangeNameInput}
        placeholder="이름"
      />
      <TextField
        type="input"
        value={birthInputValue}
        onChangeValue={handleChangeBirthInput}
        placeholder="생년월일 앞 6자리"
        maxLength={6}
      />
      <TextField
        type="input"
        value={numberInputValue}
        onChangeValue={handleChangeNumberInput}
        placeholder="휴대폰 번호 '-' 없이 입력"
        filter={phoneNumberFilter}
        maxLength={13}
      />
      <TextField
        // input / password 확인 필요
        type="input"
        value={pwdInputValue}
        onChangeValue={handleChangePwdInput}
        placeholder="비밀번호(숫자 4자리)"
        maxLength={4}
      />
    </S.InputWrapperLayout>
  );
};

export default InputWrapper;
