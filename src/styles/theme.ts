const fontGenerator = (
  fontFamily = "Pretendard",
  fontSize = "1.6rem",
  fontWeight = "normal",
  lineHeight = "normal",
  letterSpacing = "normal"
) => ({
  "font-family": fontFamily,
  "font-weight": fontWeight,
  "font-size": fontSize,
  "line-height": lineHeight,
  "letter-spacing": letterSpacing,
});

const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#0F0F0F",
    main_pink_400: "#FF006B",
    // pink
    pink_0: "#FFEAF2",
    pink_100: "#FFCFE3",
    pink_200: "#FF97C2",
    pink_300: "#FF4F98",
    pink_400: "#FB247F",
    pink_500: "#E30964",
    pink_600: "#B80450",
    pink_700: "#940742",
    pink_800: "#6F0531",
    pink_900: "#4D0322",
    // gray
    gray_0: "#F4F4F4",
    gray_100: "#EEEEEE",
    gray_200: "#CCCCCC",
    gray_300: "#B2B2B2",
    gray_400: "#939393",
    gray_500: "#797979",
    gray_600: "#626262",
    gray_700: "#3E3E3E",
    gray_800: "#2A2A2A",
    gray_900: "#1B1B1B",
    // purple
    purple_0: "#F6EEFF",
    purple_100: "#E2CCFF",
    purple_200: "#B880FF",
    purple_300: "#9D51FF",
    purple_400: "#811FFF",
    purple_500: "#6D08EF",
    purple_600: "#5B09C3",
    purple_700: "#450795",
    purple_800: "#380578",
    purple_900: "#24034E",
    // semantic
    red: "#FF4141",
    green: "#1ED45A",
    // brand
    blue_400: "#0064FF",
    yellow_400: "#FEE500",
  },
  fonts: {
    heading1: fontGenerator("Pretendard", "2.4rem", "700", "3.2rem", "-0.06rem"),
    heading2: fontGenerator("Pretendard", "2.2rem", "700", "3rem", "-0.055rem"),
    heading3: fontGenerator("Pretendard", "2rem", "700", "2.8rem", "-0.04rem"),
    heading4: fontGenerator("Pretendard", "1.8rem", "600", "2.6rem", "-0.018rem"),
    "body1-normal-semi": fontGenerator("Pretendard", "1.6rem", "600", "2.4rem", "-0.016rem"),
    "body1-normal-medi": fontGenerator("Pretendard", "1.6rem", "500", "2.4rem", "-0.016rem"),
    "body1-long": fontGenerator("Pretendard", "1.6rem", "400", "2.6rem", "-0.016rem"),
    "body2-normal-semi": fontGenerator("Pretendard", "1.4rem", "600", "2rem", "-0.007rem"),
    "body2-normal-medi": fontGenerator("Pretendard", "1.4rem", "500", "2rem", "-0.007rem"),
    "body2-long": fontGenerator("Pretendard", "1.4rem", "400", "2.2rem", "-0.007rem"),
    "caption1-semi": fontGenerator("Pretendard", "1.2rem", "600", "1.8rem", "-0.03rem"),
    "caption1-medi": fontGenerator("Pretendard", "1.2rem", "500", "1.8rem", "-0.03rem"),
    "caption2-semi": fontGenerator("Pretendard", "1.1rem", "600", "1.6rem", undefined),
    "caption2-medi": fontGenerator("Pretendard", "1.1rem", "500", "1.6rem", undefined),
  },
};

export type ColorType = typeof theme.colors;
export type FontType = typeof theme.fonts;

export default theme;
