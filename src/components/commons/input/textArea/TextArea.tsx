import React, { ChangeEvent, TextareaHTMLAttributes } from "react";
import * as S from "./TextArea.styled";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder: string;
}

const TextArea = ({ value, onChange, maxLength, placeholder, ...rest }: TextAreaProps) => {
  const handleOnInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: inputValue,
      },
    } as ChangeEvent<HTMLTextAreaElement>;

    onChange(newEvent);
  };
  return (
    <S.TextAreaWrapper>
      <S.TextAreaInput
        {...rest}
        value={value}
        onChange={handleOnInput}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {maxLength && <S.TextCap>{`${(value as string).length}/${maxLength}`}</S.TextCap>}
    </S.TextAreaWrapper>
  );
};

export default TextArea;
