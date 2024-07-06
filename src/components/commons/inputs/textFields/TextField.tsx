import { InputHTMLAttributes } from "react";
import * as S from "./TextField.style";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  cap?: number; // 글자수 제한
  placeholder: string;
  narrow?: false | true; // 좁으면 true, 넓으면 false
  unit?: "time" | "ticket" | "amount"; // 단위 : "분", "매", "초"
}

const TextField = ({ ...props }: TextFieldProps) => {
  const label = props.unit === "time" ? "분" : props.unit === "ticket" ? "매" : "초";

  return (
    <S.TextFieldLayout>
      <S.TextFieldWrapper {...props}></S.TextFieldWrapper>
      {props.unit && <S.TextUnit>{label}</S.TextUnit>}
    </S.TextFieldLayout>
  );
};

export default TextField;
