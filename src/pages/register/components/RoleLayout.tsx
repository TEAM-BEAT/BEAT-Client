import { useState } from "react";
import * as S from "../Register.styled";
import Spacing from "@components/commons/spacing/Spacing";
import { IconRoleAdd } from "@assets/svgs";
import TextField from "@components/commons/input/textField/TextField";
import RoleWrapper from "./RoleWrapper";

interface RoleLayoutProps {
  title: string;
  onImageUpload: (imageUrl: string) => void;
}

const RoleLayout = ({ title, onImageUpload }: RoleLayoutProps) => {
  const [makerList, setMakerList] = useState([]);

  const handelAddRole = () => {
    setMakerList((prev) => [
      ...prev,
      {
        makerList: "",
        makerRole: "",
        makerPhoto: "",
      },
    ]);
  };
  return (
    <S.InputRegisterBox $marginBottom={2.8}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom="1.4" />
      <S.RoleAddBtn onClick={handelAddRole}>
        <IconRoleAdd width={"3.2rem"} />
      </S.RoleAddBtn>
      {makerList.map((role, index) => (
        <RoleWrapper key={index} />
      ))}
    </S.InputRegisterBox>
  );
};

export default RoleLayout;
