import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import * as S from "./TextField.style";

export interface TextFieldPropsTypes extends InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
  placeholder: string;
  narrow?: false | true;
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "원"
  filter?: (value: string) => string;
}

const TextField = ({ maxLength, placeholder, narrow, unit, filter }: TextFieldPropsTypes) => {
  const label = unit === "time" ? "분" : unit === "ticket" ? "매" : "원";
  const [inputValue, setInputValue] = useState("");
  const [inputCount, setInputCount] = useState(0);

  // 값 입력될 떄
  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (filter) {
      value = filter(value);
    }
    setInputValue(value);
    setInputCount(value.length);
  };

  // 값 지울 때
  const handleClearInput = () => {
    setInputValue("");
    setInputCount(0);
  };

  return (
    <S.TextFieldLayout narrow={narrow}>
      <S.TextFieldWrapper>
        <S.TextFieldInput
          value={inputValue}
          onChange={handleOnInput}
          maxLength={maxLength}
          placeholder={placeholder}
        ></S.TextFieldInput>
        {!narrow && !unit && inputValue && <S.TextClear onClick={handleClearInput} />}
        {unit && <S.TextUnit>{label}</S.TextUnit>}
      </S.TextFieldWrapper>
      {maxLength && <S.TextCap>{`${inputCount}/${maxLength}`}</S.TextCap>}
    </S.TextFieldLayout>
  );
};

export default TextField;
