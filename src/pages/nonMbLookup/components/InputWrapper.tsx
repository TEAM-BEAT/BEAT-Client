import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";
import { nameFilter, numericFilter, phoneNumberFilter } from "@utils/useInputFilter";
import { usePostGuestBookingList } from "@apis/domains/bookings/queries";
import { postGuestBookingReq } from "@apis/domains/bookings/api";

interface InputProps {
  btnOn: () => void;
  btnOff: () => void;
  isReadyRequest: boolean;
  dataStatus: (status: number) => void;
}

// 서버 붙일 때 지우기 (현재 서버 없어 200/404 상황 확인하기 위해 임시로 둠)
const success = 200;
const fail = 404;

const InputWrapper = ({ btnOn, btnOff, isReadyRequest, dataStatus }: InputProps) => {
  const navigate = useNavigate();

  const { mutate, mutateAsync } = usePostGuestBookingList();

  const [nonMemberInfo, setNonMemberInfo] = useState({
    bookerName: "",
    birth: "",
    number: "",
    password: "",
    pwdStatus: false,
  });

  const { bookerName, birth, number, password, pwdStatus } = nonMemberInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;

    setNonMemberInfo((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const resetForm = () => {
    setNonMemberInfo({
      bookerName: "",
      birth: "",
      number: "",
      password: "",
      pwdStatus: false,
    });
  };

  useEffect(() => {
    if (bookerName && birth.length === 6 && number.length === 13 && password.length === 4) {
      btnOn();
    } else {
      btnOff();
    }
  }, [bookerName, birth, number, password]);

  const postUserData = async (postData: postGuestBookingReq) => {
    const bookingData = await mutateAsync(postData);
    dataStatus(200);
    navigate("/lookup", { state: bookingData });
  };

  useEffect(() => {
    if (isReadyRequest) {
      const formData = {
        bookerName: bookerName,
        birthDate: birth,
        bookerPhoneNumber: number,
        password: password,
      };

      postUserData(formData);

      if (success === 200) {
        // 404 혹은 통신 실패 경우
      } else {
        resetForm();
        // API 붙일 때는 들어온 에러 번호로 보내기
        dataStatus(404);
      }
    }
  }, [isReadyRequest]);

  return (
    <S.InputWrapperLayout>
      <TextField
        name="bookerName"
        type="input"
        value={bookerName}
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
      />
      <TextField
        type="input"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="휴대폰 번호 '-' 없이 입력"
        filter={phoneNumberFilter}
        maxLength={13}
      />
      <TextField
        type={pwdStatus ? "input" : "password"}
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호(숫자 4자리)"
        filter={numericFilter}
        maxLength={4}
      />
    </S.InputWrapperLayout>
  );
};

export default InputWrapper;
