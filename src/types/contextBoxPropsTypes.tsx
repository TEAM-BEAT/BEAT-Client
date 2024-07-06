import React, { ReactNode } from "react";

export interface contextBoxStyle {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  hasBorder?: boolean;
  borderRadius?: string;
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end";
  justifyContent?: "start" | "center" | "space-between" | "space-around" | "space-evenly";
  gap?: string;
}
export interface contextBoxPropsTypes
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    contextBoxStyle {
  children: ReactNode;
  customAlignItems?: "center" | "stretch" | "flex-start" | "flex-end";
  customPadding?: string;
}

export interface subTitleStyle {
  width?: string;
  marginRight?: string;
  customFont?: string;
}

export interface textStyle {
  width?: string;
  customFont?: string;
}

export interface boxTitleStyle {
  width?: string;
  customFont?: string;
  customColor?: string;
}

export interface boxDividerStyle {
  width?: string;
}
