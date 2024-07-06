import { InputHTMLAttributes } from "react";
import * as S from "./TextField.style";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  cap?: number;
  placeholder: string;
  narrow?: false | true;
}

const index = ({ ...props }: TextFieldProps) => {
  return <S.TextFieldWrapper {...props}></S.TextFieldWrapper>;
};

export default index;
