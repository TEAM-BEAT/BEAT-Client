import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import * as S from "./TextField.style";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  cap?: number; // 글자수 제한
  placeholder: string;
  narrow?: false | true; // 좁으면 true, 넓으면 false
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "초"
}

const TextField = ({ ...props }: TextFieldProps) => {
  const label = props.unit === "time" ? "분" : props.unit === "ticket" ? "매" : "초";
  const [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCount(e.target.value.length);
  };
  return (
    <S.TextFieldWrapper>
      <S.TextFieldInput onChange={onInputHandler} {...props}></S.TextFieldInput>
      {props.unit && <S.TextUnit>{label}</S.TextUnit>}
      {props.cap && <S.TextCap {...props}>{`${inputCount} / ${props.cap}`}</S.TextCap>}
    </S.TextFieldWrapper>
  );
};

export default TextField;
