import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";
import { nameFilter, numericFilter, phoneNumberFilter } from "@utils/useInputFilter";
import { usePostGuestBookingList } from "@apis/domains/bookings/queries";
import { postGuestBookingReq } from "@apis/domains/bookings/api";
import Loading from "@components/commons/loading/Loading";

interface InputProps {
  btnOn: () => void;
  btnOff: () => void;
  isReadyRequest: boolean;
  dataStatus: (status: number) => void;
}

const InputWrapper = ({ btnOn, btnOff, isReadyRequest, dataStatus }: InputProps) => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = usePostGuestBookingList();

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
    console.log(bookingData);
    if (bookingData === 404) {
      resetForm();
      dataStatus(404);
    } else {
      dataStatus(200);
      navigate("/lookup", { state: bookingData });
    }
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
    }
  }, [isReadyRequest]);

  return (
    <>
      {isPending && <Loading />}
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
    </>
  );
};

export default InputWrapper;
