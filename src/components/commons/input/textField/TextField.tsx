import { IconEyeOff, IconEyeOn } from "@assets/svgs";
import React, { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react";
import * as S from "./TextField.styled";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder: string;
  narrow?: boolean;
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "원"
  filter?: (value: string) => string;
  cap?: false | true;
  onToggleClick?: () => void;
  isDisabled: boolean;
}

const TextField = ({
  type = "input",
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  narrow,
  unit,
  filter,
  cap,
  isDisabled,
  onToggleClick,
  ...rest
}: TextFieldProps) => {
  const label = unit === "time" ? "분" : unit === "ticket" ? "매" : "원";

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(type !== "password"); // 비밀번호 입력값 보이기/숨기기

  // 값 입력될 떄
  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;

    if (filter) {
      inputValue = filter(inputValue);
    }
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        name: inputName,
        value: inputValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange(newEvent);
  };

  // 값 지울 때
  const handleClearInput = () => {
    if (inputRef.current) {
      const inputName = inputRef.current.name;

      // 값 지우기
      inputRef.current.value = "";

      const newEvent = {
        target: {
          name: inputName,
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>;

      inputRef.current.focus();
      onChange(newEvent);
    }
  };

  // 비밀번호 입력값 보이기 여부 관리
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <S.TextFieldLayout $narrow={narrow}>
      <S.TextFieldWrapper>
        <S.TextFieldInput
          $isDisabled={isDisabled}
          ref={inputRef}
          value={value}
          name={name}
          onChange={handleOnInput}
          maxLength={maxLength}
          placeholder={placeholder}
          $narrow={narrow}
          type={isPasswordVisible ? "text" : "password"} // 비밀번호 보이기 여부를 위해 타입에 조건을 걸음
          {...rest}
        />
        {!narrow && !unit && value && type !== "password" && !isDisabled && (
          <S.TextClear onClick={handleClearInput} />
        )}
        {unit && <S.TextUnit>{label}</S.TextUnit>}
        {type === "password" && (
          <S.ToggleVisibilityIcon
            onClick={handlePasswordVisibility}
            as={isPasswordVisible ? IconEyeOn : IconEyeOff}
          />
        )}
      </S.TextFieldWrapper>
      {maxLength && cap && <S.TextCap>{`${(value as string).length}/${maxLength}`}</S.TextCap>}
    </S.TextFieldLayout>
  );
};

export default TextField;
