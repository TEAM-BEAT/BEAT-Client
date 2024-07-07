import * as S from "./ContextBox.styled";
import { contextBoxProps } from "src/types/contextBoxProps";

const ContextBox = ({
  customAlignItems = "flex-start",
  customPadding = "1.6rem 1.6rem",
  children,
  ...rest
}: contextBoxProps) => {
  return (
    <S.ContextBoxWrapper>
      <S.ContextBoxLayout
        alignItems={customAlignItems}
        padding={customPadding}
        gap="1.2rem"
        {...rest}
      >
        {children}
      </S.ContextBoxLayout>
    </S.ContextBoxWrapper>
  );
};

export default ContextBox;
