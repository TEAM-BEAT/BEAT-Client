import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconEyeOff, IconEyeOn } from "@assets/svgs";
import * as S from "./TextField.styled";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder: string;
  narrow?: boolean;
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "원"
  filter?: (value: string) => string;
  cap?: false | true;
  isDisabled?: boolean;
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
  ...rest
}: TextFieldProps) => {
  const label = unit === "time" ? "분" : unit === "ticket" ? "매" : "원";

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(type !== "password"); // 비밀번호 입력값 보이기/숨기기
  const [inputValue, setInputValue] = useState(value as string); // 현재 입력값
  const prevValueRef = useRef(value as string); // 이전 입력값
  const rafRef = useRef<number | null>(null); // requestAnimationFrame ID

  useEffect(() => {
    setInputValue(value as string);
    prevValueRef.current = value as string;
  }, [value]);

  const handleOnInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current); // 이전 requestAnimationFrame이 있으면 취소
      }

      rafRef.current = requestAnimationFrame(() => {
        // 새로운 requestAnimationFrame 요청
        let filteredValue = newValue;
        if (filter) {
          if (newValue.length < prevValueRef.current.length) {
            // 삭제라면 전체 값 필터링
            filteredValue = filter(newValue);
          } else {
            // 추가라면 새로 추가된 부분만 추출해서 필터링 후 합치기
            const addedPart = newValue.slice(prevValueRef.current.length);
            const filteredAddedPart = filter(addedPart);
            filteredValue = prevValueRef.current + filteredAddedPart;
          }
        }

        if (maxLength && filteredValue.length > maxLength) {
          filteredValue = filteredValue.slice(0, maxLength);
        }

        const newEvent = {
          ...e,
          target: {
            ...e.target,
            name: name,
            value: filteredValue,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange(newEvent);
        prevValueRef.current = filteredValue; // 이전 입력 값을 현재 값으로 업데이트
        setInputValue(filteredValue); // 현재 입력값을 필터링된 값으로 업데이트
      });
    },
    [onChange, filter, maxLength, name]
  );

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
