import { ChangeEvent, TextareaHTMLAttributes } from "react";
import * as S from "./TextArea.styled";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChangeValue: (value: string) => void;
  maxLength?: number;
  placeholder: string;
}

const TextArea = ({ value, onChangeValue, maxLength, placeholder, ...rest }: TextAreaProps) => {
  const handleOnInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    onChangeValue(inputValue);
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
