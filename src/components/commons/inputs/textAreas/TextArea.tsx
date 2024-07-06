import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import * as S from "./TextArea.style";

export interface TextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  cap?: number; // 글자수 제한
  placeholder: string;
}

const TextArea = ({ ...props }: TextAreaProps) => {
  const [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCount(e.target.value.length);
  };
  return (
    <S.TextAreaWrapper>
      <S.TextAreaInput onChange={onInputHandler} {...props}></S.TextAreaInput>
      {props.cap && <S.TextCap {...props}>{`${inputCount} / ${props.cap}`}</S.TextCap>}
    </S.TextAreaWrapper>
  );
};

export default TextArea;
