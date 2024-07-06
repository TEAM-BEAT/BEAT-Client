import React from "react";
import * as S from "./Chip.styled";

export type ChipsColorTypes = "pink" | "white" | "gray";

interface ChipsProps {
  label: string;
  color?: ChipsColorTypes;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Chip = ({ label, color, icon, onClick }: ChipsProps) => {
  return (
    <S.ChipWrapper color={color} onClick={onClick}>
      {icon && <S.ChipIcon>{icon}</S.ChipIcon>}
      <span>{label}</span>
    </S.ChipWrapper>
  );
};

export default Chip;
