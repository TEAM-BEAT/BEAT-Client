import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";

interface InputRegisterBoxProps {
  title: string;
  marginBottom?: number;
  children: ReactNode;
}

const InputRegisterBox = ({ title, marginBottom = 1.6, children }: InputRegisterBoxProps) => {
  return (
    <S.InputRegisterBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom={"1.4"} />
      {children}
    </S.InputRegisterBox>
  );
};

export default InputRegisterBox;
