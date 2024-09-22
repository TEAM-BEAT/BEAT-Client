import TextField from "@components/commons/input/textField/TextField";
import { numericFilter } from "@utils/useInputFilter";
import React from "react";
import * as S from "./EasyPassEntry.styled";

interface EasyPassEntryProps {
  password: string;
  passwordCheck: string;
  onChangeEasyPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EasyPassEntry = ({ password, passwordCheck, onChangeEasyPassword }: EasyPassEntryProps) => {
  return (
    <S.Wrapper>
      <S.Title>간편 비밀번호</S.Title>
      <TextField
        name="password"
        type="password"
        value={password}
        onChange={onChangeEasyPassword}
        filter={numericFilter}
        maxLength={4}
        placeholder="숫자 4자리"
        inputMode="numeric"
      />
      <TextField
        name="passwordCheck"
        type="password"
        value={passwordCheck}
        onChange={onChangeEasyPassword}
        filter={numericFilter}
        maxLength={4}
        placeholder="한 번 더 입력"
        inputMode="numeric"
      />
    </S.Wrapper>
  );
};

export default EasyPassEntry;
