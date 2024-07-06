import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import * as S from "./TextField.style";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
  placeholder: string;
  narrow?: false | true;
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "초"
  filter?: (value: string) => string;
}

const TextField = ({ maxLength, placeholder, narrow, unit, filter }: TextFieldProps) => {
  const label = unit === "time" ? "분" : unit === "ticket" ? "매" : "초";
  const [inputValue, setInputValue] = useState("");
  const [inputCount, setInputCount] = useState(0);

  // 값 입력될 떄
  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (filter) {
      value = filter(value);
    }
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
        {!narrow && !unit && inputValue && <S.TextClear onClick={clearInput} />}
        {unit && <S.TextUnit>{label}</S.TextUnit>}
      </S.TextFieldWrapper>
      {maxLength && <S.TextCap>{`${inputCount}/${maxLength}`}</S.TextCap>}
    </S.TextFieldLayout>
  );
};

export default TextField;
