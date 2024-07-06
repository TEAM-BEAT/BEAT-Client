import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import * as S from "./TextField.style";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number; // 글자수 제한
  placeholder: string;
  narrow?: false | true; // 좁으면 true, 넓으면 false
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "초"
}

const TextField = ({ maxLength, placeholder, narrow, unit }: TextFieldProps) => {
  const label = unit === "time" ? "분" : unit === "ticket" ? "매" : "초";
  const [inputValue, setInputValue] = useState("");
  const [inputCount, setInputCount] = useState(0);

  // 값 입력될 떄
  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputCount(e.target.value.length);
  };

  // 값 지울 때
  const clearInput = () => {
    setInputValue("");
    setInputCount(0);
  };

  return (
    <S.TextFieldLayout narrow={narrow}>
      <S.TextFieldWrapper>
        <S.TextFieldInput
          value={inputValue}
          onChange={onInputHandler}
          maxLength={maxLength}
          placeholder={placeholder}
        ></S.TextFieldInput>
        {inputValue && <S.TextClear onClick={clearInput} />}
      </S.TextFieldWrapper>
      {unit && <S.TextUnit>{label}</S.TextUnit>}
      {maxLength && <S.TextCap>{`${inputCount}/${maxLength}`}</S.TextCap>}
    </S.TextFieldLayout>
  );
};

export default TextField;
