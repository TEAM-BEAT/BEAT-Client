import React, { ReactNode } from "react";

export interface contentBoxStyle {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  hasBorder?: boolean;
  borderRadius?: string;
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end";
  justifyContent?: "start" | "center" | "space-between" | "space-around" | "space-evenly";
}

export interface contentBoxPropsTypes
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    contentBoxStyle {
  children: ReactNode;
  className?: string;
}
