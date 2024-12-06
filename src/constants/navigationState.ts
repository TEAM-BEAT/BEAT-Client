export const NAVIGATION_STATE = {
  ICON_TITLE: "iconTitle",
  TITLE_ICON: "titleIcon",
  ICON_TITLE_ICON: "iconTitleIcon",
  TITLE_SUB_TEXT: "titleSubText",
  ICON_TITLE_SUB_TEXT: "iconTitleSubText",
  ICON: "icon",
  LOGO_HAMBURGAR: "logoHamburgar",
  ICON_ICON: "iconIcon",
} as const;

export type NavigationState = (typeof NAVIGATION_STATE)[keyof typeof NAVIGATION_STATE];
