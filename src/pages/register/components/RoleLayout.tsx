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
        id: Date.now(),
        makerName: "",
        makerRole: "",
        makerPhoto: "",
      },
    ]);
  };

  const handleremoveRole = (id: number) => {
    setMakerList((prev) => prev.filter((role) => role.id !== id));
  };

  console.log(makerList);

  return (
    <S.InputRegisterBox $marginBottom={2.8}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom="1.4" />
      <S.RoleListWrapper>
        {makerList.map((role) => (
          <RoleWrapper
            key={role.id}
            id={role.id}
            removeRole={handleremoveRole}
            onImageUpload={onImageUpload}
          />
        ))}
        <S.RoleAddBtn onClick={handelAddRole}>
          <IconRoleAdd width={"3.2rem"} />
        </S.RoleAddBtn>
      </S.RoleListWrapper>
    </S.InputRegisterBox>
  );
};

export default RoleLayout;
