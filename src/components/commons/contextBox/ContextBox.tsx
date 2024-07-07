import * as S from "./ContextBox.styled";
import { contextBoxPropsTypes } from "../../../types/contextBoxPropsTypes";

const ContextBox = ({
  customAlignItems = "flex-start",
  customPadding = "1.6rem 1.6rem",
  children,
  ...rest
}: contextBoxPropsTypes) => {
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
