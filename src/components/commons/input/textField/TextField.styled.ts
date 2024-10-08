import { IconTextfiedlDelete } from "@assets/svgs";
import { Generators } from "@styles/generator";
import styled from "styled-components";

export const TextFieldLayout = styled.section<{ $narrow: boolean | undefined }>`
  position: relative;
  width: ${({ $narrow }) => ($narrow ? "13.6rem" : "32.7rem")};
`;

export const TextFieldWrapper = styled.article`
  ${Generators.flexGenerator("row", "center", "center")}
`;

export const TextFieldInput = styled.input<{ $narrow: boolean | undefined; $isDisabled?: boolean }>`
  width: 100%;
  height: ${({ $narrow }) => ($narrow ? "4.2rem" : "4.8rem")};
  padding: 0 1.6rem;

  color: ${({ theme, $isDisabled }) => ($isDisabled ? theme.colors.gray_600 : theme.colors.gray_0)};

  background: ${({ theme }) => theme.colors.gray_800};
  border: 1px solid transparent;
  border-radius: 0.6rem;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_600};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.gray_0};
  }
`;

export const TextClear = styled(IconTextfiedlDelete)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 2.4rem;

  cursor: pointer;
`;

export const TextUnit = styled.p`
  position: absolute;
  right: 1.6rem;

  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const ToggleVisibilityIcon = styled.section`
  position: absolute;
  right: 1.6rem;

  width: 2.4rem;
`;

export const TextCap = styled.p`
  ${Generators.flexGenerator("row", "center", "end")}

  width: 100%;
  margin: 0;
  margin-top: 0.6rem;

  color: ${({ theme }) => theme.colors.gray_500};
  text-align: right;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;
