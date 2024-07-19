import { Generators } from "@styles/generator";
import styled from "styled-components";

export const StepperWrapper = styled.div`
  ${Generators.flexGenerator()};
  gap: 0.6rem;
  width: 11.5rem;
  height: 4rem;
  padding: 0.8rem 1rem;

  background: ${({ theme }) => theme.colors.gray_900};
  border: 1px solid ${({ theme }) => theme.colors.gray_700};
  border-radius: 6px;
`;

export const StepperBtn = styled.button<{ disabled: boolean }>`
  ${Generators.flexGenerator()};
  width: 2.4rem;
  height: 2.4rem;

  color: ${({ theme, disabled }) => (disabled ? theme.colors.gray_500 : theme.colors.white)};

  cursor: ${({ theme, disabled }) => (disabled ? "not-allowed" : "pointer")};

  stroke: ${({ theme, disabled }) => (disabled ? theme.colors.gray_500 : theme.colors.white)};
`;

export const StepperNum = styled.p`
  ${Generators.flexGenerator()};

  width: 3.5rem;
  height: 1.3rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.heading4}
`;
