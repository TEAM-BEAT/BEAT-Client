import React from "react";
import * as S from "./Chip.styled";

export type ChipsColorTypes = "pink" | "white" | "gray";

interface ChipsProps {
  label: string;
  color?: ChipsColorTypes;
  icon?: React.ReactNode;
}

const Chip = ({ label, color, icon }: ChipsProps) => {
  return (
    <S.ChipWrapper color={color}>
      {icon && <S.ChipIcon>{icon}</S.ChipIcon>}
      <span>{label}</span>
    </S.ChipWrapper>
  );
};

export default Chip;
