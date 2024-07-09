import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./InputWrapper.styled";

import TextField from "@components/commons/input/textField/TextField";
import { phoneNumberFilter } from "@utils/useInputFilter";

interface InputProps {
  btnOn: () => void;
  btnOff: () => void;
  inputActive: boolean;
  dataStatus: (status: number) => void;
}

// 서버 붙일 때 지우기 (현재 서버 없어 200/404 상황 확인하기 위해 임시로 둠)
const success = 200;
const fail = 404;

const InputWrapper = ({ btnOn, btnOff, inputActive, dataStatus }: InputProps) => {
  const navigate = useNavigate();

  const [nameInputValue, setNameInputValue] = useState("");
  const [birthInputValue, setBirthInputValue] = useState("");
  const [numberInputValue, setNumberInputValue] = useState("");
  const [pwdInputValue, setPwdInputValue] = useState("");
  const [pwdStatus, setPwdStatus] = useState(false);

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

  const handlePwd = () => {
    setPwdStatus(!pwdStatus);
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
  }, [nameInputValue, birthInputValue, numberInputValue, pwdInputValue, inputActive]);

  useEffect(() => {
    if (inputActive) {
      // API 붙일 때 이 부분 서버 통신 성공 경우
      // API 붙일 때 여기서 서버 POST
      if (success === 200) {
        // API 붙일 경우 dataStatus(서버에서 온 상태);
        dataStatus(200);

        navigate("/lookup");
        // 200일 경우 잘 오는지 확인하기 위한 console.log -> API 붙일 때 지우면 됨
        console.log([nameInputValue, birthInputValue, numberInputValue, pwdInputValue]);
        // 404 혹은 통신 실패 경우
      } else {
        setNameInputValue("");
        setBirthInputValue("");
        setNumberInputValue("");
        setPwdInputValue("");
        // API 붙일 때는 들어온 에러 번호로 보내기
        dataStatus(404);
      }
    }
  }, [inputActive]);

  return (
    <S.InputWrapperLayout>
      {/* maxLenght 있는 부분 InputField에서 글자수 보이게 / 안 보이게 조정 필요 */}
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
        type={pwdStatus ? "input" : "password"}
        value={pwdInputValue}
        onChangeValue={handleChangePwdInput}
        placeholder="비밀번호(숫자 4자리)"
        maxLength={4}
      />
      <S.EyeTest onClick={handlePwd}>버튼 임시 위치!!!!!!!</S.EyeTest>
    </S.InputWrapperLayout>
  );
};

export default InputWrapper;
