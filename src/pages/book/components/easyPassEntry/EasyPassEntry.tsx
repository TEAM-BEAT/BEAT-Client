import TextField from "@components/commons/input/textField/TextField";
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
      {/* TODO: eye input으로 변경 */}
      <TextField
        name="password"
        type="input"
        value={password}
        onChange={onChangeEasyPassword}
        maxLength={4}
        placeholder="숫자 4자리"
      />
      <TextField
        name="passwordCheck"
        type="input"
        value={passwordCheck}
        onChange={onChangeEasyPassword}
        maxLength={4}
        placeholder="한 번 더 입력"
      />
    </S.Wrapper>
  );
};

export default EasyPassEntry;
