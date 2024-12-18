import { ReactNode } from "react";
import * as S from "./ManageCardMain.styled";

export interface ManageCardMainProps {
  children: ReactNode;
}

const ManageCardMain = ({ children }: ManageCardMainProps) => {
  return <S.ManageCardMainWrapper>{children}</S.ManageCardMainWrapper>;
};

export default ManageCardMain;
