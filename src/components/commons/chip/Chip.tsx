import React from "react";
import * as S from "./Chip.styled";

export type ChipsColorTypes = "pink" | "white" | "gray";

interface ChipProps {
  label: string;
  color?: ChipsColorTypes;
  icon?: React.ReactNode;
  iconColor?: string;
  onClick?: () => void;
}

const Chip = ({ label, color, icon, iconColor, onClick }: ChipProps) => {
  return (
    <S.ChipWrapper color={color} onClick={onClick}>
      {icon && <S.ChipIcon iconColor={iconColor}>{icon}</S.ChipIcon>}
      <span>{label}</span>
    </S.ChipWrapper>
  );
};

export default Chip;
