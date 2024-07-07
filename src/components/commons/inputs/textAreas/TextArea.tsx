import { ChangeEvent, TextareaHTMLAttributes, useState } from "react";
import * as S from "./TextArea.style";

export interface TextAreaPropsTypes extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  placeholder: string;
}

const TextArea = ({ maxLength, placeholder }: TextAreaPropsTypes) => {
  const [inputValue, setInputValue] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const handleOnInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputCount(value.length);
  };
  console.log(inputValue);
  return (
    <S.TextAreaWrapper>
      <S.TextAreaInput
        value={inputValue}
        onChange={handleOnInput}
        maxLength={maxLength}
        placeholder={placeholder}
      ></S.TextAreaInput>
      {maxLength && <S.TextCap>{`${inputCount}/${maxLength}`}</S.TextCap>}
    </S.TextAreaWrapper>
  );
};

export default TextArea;
