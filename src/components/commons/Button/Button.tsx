import * as S from "./Button.styled";

export interface ButtonPropTypes {
  size: "xlarge" | "large" | "medium" | "small" | "xsmall";
  isDisabled?: boolean;
  varient: "primary" | "line" | "gray" | "blue";
}

const Button = ({ size, isDisabled, varient }: ButtonPropTypes) => {
  return (
    <>
      {varient === "primary" && <S.PrimaryButton size={size} isDisabled={isDisabled} />}
      {varient === "line" && <S.LineButton size={size} isDisabled={isDisabled} />}
      {varient === "gray" && <S.GrayButton size={size} isDisabled={isDisabled} />}
      {varient === "blue" && <S.BlueButton size={size} isDisabled={isDisabled} />}
    </>
  );
};

export default Button;
