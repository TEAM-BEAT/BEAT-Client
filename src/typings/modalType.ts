import React from "react";

export interface AlertProps {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  okText?: string;
  okCallback?: () => void;
}

export interface ConfirmProps {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  okText?: string;
  okCallback?: () => void;
  noText?: string;
  noCallback?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
}
