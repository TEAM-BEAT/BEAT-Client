import TextField from "@components/commons/input/textField/TextField";
import { phoneNumberFilter } from "@utils/useInputFilter";
import React from "react";
import * as S from "./BookerInfo.styled";

interface BookerInfoProps {
  onChangeBookerInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookerInfo = ({ onChangeBookerInfo }: BookerInfoProps) => {
  return (
    <S.Wrapper>
      <S.Title>예매자 정보</S.Title>
      <TextField name="name" onChange={onChangeBookerInfo} placeholder="예매자(대표 예매자) 이름" />
      <TextField
        name="phoneNumber"
        onChange={onChangeBookerInfo}
        filter={phoneNumberFilter}
        placeholder="휴대폰 번호 (‘-’ 없이 입력)"
      />
    </S.Wrapper>
  );
};

export default BookerInfo;
