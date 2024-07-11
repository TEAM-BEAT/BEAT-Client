import { NavigationState } from "@constants/navigationState";

export interface HeaderProps {
  headerStyle: NavigationState;
  title?: string;
  subTitle?: string;
  leftOnClick?: () => void;
  rightOnClikc?: () => void;
}
