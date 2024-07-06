import { ChangeEvent, TextareaHTMLAttributes, useState } from "react";
import * as S from "./TextArea.style";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number; // 글자수 제한
  placeholder: string;
}

const TextArea = ({ maxLength, placeholder }: TextAreaProps) => {
  const [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };
  return (
    <S.TextAreaWrapper>
      <S.TextAreaInput
        onChange={onInputHandler}
        maxLength={maxLength}
        placeholder={placeholder}
      ></S.TextAreaInput>
      {maxLength && <S.TextCap>{`${inputCount} / ${maxLength}`}</S.TextCap>}
    </S.TextAreaWrapper>
  );
};

export default TextArea;
