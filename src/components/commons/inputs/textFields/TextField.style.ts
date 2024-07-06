import { Generators } from "@styles/generator";
import styled from "styled-components";
import theme from "@styles/theme";
import { TextFieldProps } from "./TextField";

export const TextFieldLayout = styled.section`
  position: relative;
`;
export const TextFieldWrapper = styled.input<TextFieldProps>`
  ${Generators.flexGenerator("row", "center", "center")}
  width:    ${(props) => (props.narrow ? "13.6rem" : "32.7rem")};
  height: 4.8rem;
  padding: 0 1.6rem;

  color: ${theme.colors.white};

  background: ${theme.colors.gray_800};
  border: none;
  border-radius: 0.6rem;

  ${theme.fonts["body2-normal-medi"]};

  &::placeholder {
    color: ${theme.colors.gray_600};
  }

  &:focus {
    border: 1px solid ${theme.colors.gray_0};
  }
`;

export const TextUnit = styled.p`
  position: absolute;
  top: 0;
  right: 1.6rem;

  color: ${theme.colors.white};
  ${theme.fonts["body2-normal-medi"]};
`;
