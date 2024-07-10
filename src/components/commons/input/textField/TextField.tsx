import { ChangeEvent, InputHTMLAttributes } from "react";
import * as S from "./TextField.styled";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeValue: (value: string) => void;
  maxLength?: number;
  placeholder: string;
  narrow?: false | true;
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "원"
  filter?: (value: string) => string;
  cap?: false | true;
}

const TextField = ({
  value,
  onChangeValue,
  maxLength,
  placeholder,
  narrow,
  unit,
  filter,
  cap,
  ...rest
}: TextFieldProps) => {
  const label = unit === "time" ? "분" : unit === "ticket" ? "매" : "원";

  // 값 입력될 떄
  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (filter) {
      inputValue = filter(inputValue);
    }
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    onChangeValue(inputValue);
  };

  // 값 지울 때
  const handleClearInput = () => {
    onChangeValue("");
  };

  return (
    <S.TextFieldLayout narrow={narrow}>
      <S.TextFieldWrapper>
        <S.TextFieldInput
          {...rest}
          value={value}
          onChange={handleOnInput}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        {!narrow && !unit && value && <S.TextClear onClick={handleClearInput} />}
        {unit && <S.TextUnit>{label}</S.TextUnit>}
      </S.TextFieldWrapper>
      {maxLength && cap && <S.TextCap>{`${(value as string).length}/${maxLength}`}</S.TextCap>}
    </S.TextFieldLayout>
  );
};

export default TextField;
