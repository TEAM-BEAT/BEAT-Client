import React, { useState } from "react";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";

const InputWrapper = () => {
  const [nameInputValue, setNameInputValue] = useState("");

  const handleChangeNameInput = (value: string) => {
    setNameInputValue(value);
  };

  return (
    <S.InputWrapperLayout>
      <TextField value={nameInputValue} onChangeValue={handleChangeNameInput} placeholder="이름" />
    </S.InputWrapperLayout>
  );
};

export default InputWrapper;
