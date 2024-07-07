import React, { ReactNode } from "react";

export interface ContextBoxStyle {
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
export interface ContextBoxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ContextBoxStyle {
  children: ReactNode;
  customAlignItems?: "center" | "stretch" | "flex-start" | "flex-end";
  customPadding?: string;
}

export interface SubTitleStyle {
  width?: string;
  marginRight?: string;
  customFont?: string;
}

export interface TextStyle {
  width?: string;
  customFont?: string;
}

export interface BoxTitleStyle {
  width?: string;
  customFont?: string;
  customColor?: string;
}

export interface BoxDividerStyle {
  width?: string;
}
