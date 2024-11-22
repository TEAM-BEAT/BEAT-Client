import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconEyeOff, IconEyeOn, IconSearch } from "@assets/svgs";
import * as S from "./MapInput.styled";
import { splitGraphemes } from "@utils/useInputFilter";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder: string;
  narrow?: boolean;
  filter?: (value: string) => string;
  cap?: false | true;
  isDisabled?: boolean;
}

const MapInput = ({
  type = "input",
  name,
  value = "",
  onChange,
  maxLength,
  placeholder,
  narrow,
  filter,
  cap,
  isDisabled,
  inputMode,
  ...rest
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
          filteredValue = filter(newValue); // 전체 값을 필터링
        }

        if (maxLength && splitGraphemes(filteredValue as string).length > maxLength) {
          filteredValue = splitGraphemes(filteredValue as string)
            .slice(0, maxLength)
            .join("");
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

  return (
    <S.TextFieldLayout $narrow={narrow}>
      <S.TextFieldWrapper>
        <S.TextFieldInput
          $isDisabled={isDisabled}
          ref={inputRef}
          value={inputValue}
          name={name}
          onChange={handleOnInput}
          placeholder={placeholder}
          $narrow={narrow}
          inputMode={inputMode}
          {...rest}
        />
        <S.TextUnit>
          <IconSearch />
        </S.TextUnit>
      </S.TextFieldWrapper>
      {maxLength && cap && (
        <S.TextCap>{`${splitGraphemes(value as string).length}/${maxLength}`}</S.TextCap>
      )}
      {inputValue && (
        <S.SearchDropDownWrapper>
          <S.DropDownItem>
            <S.RoadName>테스트입니당</S.RoadName>
            <S.PostName>테스트입니당</S.PostName>
          </S.DropDownItem>
          <S.Divider />
          <S.DropDownItem>
            <S.RoadName>서울 서대문구 연희로 32</S.RoadName>
            <S.PostName>서울 서대문구 창천동 448</S.PostName>
          </S.DropDownItem>
          <S.Divider />
          <S.DropDownItem>
            <S.RoadName>서울 서대문구 연희로 32</S.RoadName>
            <S.PostName>서울 서대문구 창천동 5-70</S.PostName>
          </S.DropDownItem>
          <S.Divider />
          <S.DropDownItem>
            <S.RoadName>서울 서대문구 연희로 32</S.RoadName>
            <S.PostName>서울 서대문구 창천동 448</S.PostName>
          </S.DropDownItem>
        </S.SearchDropDownWrapper>
      )}
    </S.TextFieldLayout>
  );
};

export default MapInput;
