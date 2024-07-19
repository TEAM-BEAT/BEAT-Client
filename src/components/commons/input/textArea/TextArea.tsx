import React, { ChangeEvent, TextareaHTMLAttributes } from "react";
import * as S from "./TextArea.styled";
import { splitGraphemes } from "@utils/useInputFilter";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder: string;
}

const TextArea = ({ value, onChange, maxLength, placeholder, ...rest }: TextAreaProps) => {
  const handleOnInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    let newValue = inputValue;
    if (maxLength && splitGraphemes(newValue as string).length > maxLength) {
      newValue = splitGraphemes(newValue as string)
        .slice(0, maxLength)
        .join("");
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name: inputName,
        value: newValue,
      },
    } as ChangeEvent<HTMLTextAreaElement>;

    onChange(newEvent);
  };
  return (
    <S.TextAreaWrapper>
      <S.TextAreaInput {...rest} value={value} onChange={handleOnInput} placeholder={placeholder} />
      {maxLength && (
        <S.TextCap>{`${splitGraphemes(value as string).length}/${maxLength}`}</S.TextCap>
      )}
    </S.TextAreaWrapper>
  );
};

export default TextArea;
