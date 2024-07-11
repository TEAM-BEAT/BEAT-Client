import { NavigationState } from "@constants/navigationState";

export interface HeaderProps {
  headerStyle: NavigationState;
  title?: string;
  subText?: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
}
