import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";
import { numericFilter, phoneNumberFilter } from "@utils/useInputFilter";

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

  const handlePwd = () => {
    setNonMemberInfo((prevState) => ({
      ...prevState,
      pwdStatus: !prevState.pwdStatus,
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

  useEffect(() => {
    if (isReadyRequest) {
      // API 붙일 때 이 부분 서버 통신 성공 경우
      // API 붙일 때 여기서 서버 POST
      if (success === 200) {
        // API 붙일 경우 dataStatus(서버에서 온 상태);
        dataStatus(200);

        navigate("/lookup");
        // 200일 경우 잘 오는지 확인하기 위한 console.log -> API 붙일 때 지우면 됨
        console.log([name, birth, number, password]);
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
      {/* maxLenght 있는 부분 InputField에서 글자수 보이게 / 안 보이게 조정 필요 */}
      <TextField
        name="name"
        type="input"
        value={bookerName}
        onChange={handleChange}
        placeholder="이름"
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
      {/* <S.EyeTest onClick={handlePwd}>버튼 임시 위치!!!!!!!</S.EyeTest> */}
    </S.InputWrapperLayout>
  );
};

export default InputWrapper;
