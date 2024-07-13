import { useEffect, useState } from "react";
import * as S from "../Register.styled";
import Spacing from "@components/commons/spacing/Spacing";
import { IconRoleAdd } from "@assets/svgs";
import RoleWrapper from "./RoleWrapper";

interface Role {
  id: number;
  makerName: string;
  makerRole: string;
  makerPhoto: string;
}

interface RoleLayoutProps {
  updateList: (list: any[]) => void;
  title: string;
}

const RoleLayout = ({ updateList, title }: RoleLayoutProps) => {
  const [makerList, setMakerList] = useState<Role[]>([]);

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

  const handleUpdateRole = (id: number, name: string, value: string) => {
    setMakerList((prev) =>
      prev.map((role) => (role.id === id ? { ...role, [name]: value } : role))
    );
  };

  useEffect(() => {
    const newMakerList = makerList.map((role) => {
      if (title === "출연진") {
        return {
          castName: role.makerName,
          castRole: role.makerRole,
          castPhoto: role.makerPhoto,
        };
      }
      if (title === "스태프") {
        return {
          staffName: role.makerName,
          staffRole: role.makerRole,
          staffPhoto: role.makerPhoto,
        };
      }
    });
    updateList(newMakerList);
  }, [makerList]);

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
            onUpdateRole={handleUpdateRole}
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
