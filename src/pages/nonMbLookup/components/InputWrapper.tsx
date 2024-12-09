import React from "react";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";
import { nameFilter, numericFilter, phoneNumberFilter } from "@utils/useInputFilter";

interface InputWrapperProps {
  formData: {
    name: string;
    birth: string;
    phone: string;
    password: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const InputWrapper = ({ formData, onInputChange }: InputWrapperProps) => {
  const { name, birth, phone, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;
    onInputChange(fieldName, value); // 상위 컴포넌트에 상태 전달
  };

  return (
    <S.InputWrapperLayout>
      <TextField
        name="name"
        type="input"
        value={name}
        placeholder="이름"
        onChange={handleChange}
        filter={nameFilter}
      />
      <TextField
        type="input"
        name="birth"
        value={birth}
        onChange={handleChange}
        placeholder="생년월일 앞 6자리"
        filter={numericFilter}
        maxLength={6}
        inputMode="numeric"
      />
      <TextField
        type="input"
        name="phone"
        value={phone}
        onChange={handleChange}
        placeholder="휴대폰 번호 '-' 없이 입력"
        filter={phoneNumberFilter}
        maxLength={13}
        inputMode="tel"
      />
      <TextField
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호(숫자 4자리)"
        filter={numericFilter}
        maxLength={4}
        inputMode="numeric"
      />
    </S.InputWrapperLayout>
  );
};

export default InputWrapper;
