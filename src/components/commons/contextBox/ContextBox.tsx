import * as S from "./ContextBox.styled";
import { ContextBoxProps } from "@typings/contextBoxProps";

const ContextBox = ({
  alignItems = "flex-start",
  padding = "1.6rem 1.6rem",
  gap = "1.2rem",
  children,
  ...rest
}: ContextBoxProps) => {
  return (
    <S.ContextBoxWrapper>
      <S.ContextBoxLayout alignItems={alignItems} padding={padding} gap={gap} {...rest}>
        {children}
      </S.ContextBoxLayout>
    </S.ContextBoxWrapper>
  );
};

export default ContextBox;
