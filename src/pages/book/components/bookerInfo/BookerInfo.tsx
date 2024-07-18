import TextField from "@components/commons/input/textField/TextField";
import { numericFilter, phoneNumberFilter } from "@utils/useInputFilter";
import React from "react";
import * as S from "./BookerInfo.styled";

interface BookerInfoProps {
  isNonMember: boolean;
  bookerInfo: {
    bookerName: string;
    bookerPhoneNumber: string;
    birthDate: string;
  };
  onChangeBookerInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookerInfo = ({ isNonMember, bookerInfo, onChangeBookerInfo }: BookerInfoProps) => {
  return (
    <S.Wrapper>
      <S.Title>예매자 정보</S.Title>
      <TextField
        name="bookerName"
        type="input"
        value={bookerInfo.bookerName}
        onChange={onChangeBookerInfo}
        placeholder="예매자(대표 예매자) 이름"
        maxLength={5}
      />
      <TextField
        name="bookerPhoneNumber"
        type="input"
        value={bookerInfo.bookerPhoneNumber}
        onChange={onChangeBookerInfo}
        filter={phoneNumberFilter}
        placeholder="휴대폰 번호 (‘-’ 없이 입력)"
        maxLength={13}
      />
      {isNonMember && (
        <TextField
          name="birthDate"
          type="input"
          value={bookerInfo.birthDate}
          onChange={onChangeBookerInfo}
          filter={numericFilter}
          maxLength={6}
          placeholder="생년월일 6자리"
        />
      )}
    </S.Wrapper>
  );
};

export default BookerInfo;
