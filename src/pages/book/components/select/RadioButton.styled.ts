import styled from "styled-components";

export const Label = styled.label<{ checked: boolean; $isSoldOut: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1rem 1.2rem 1.6rem;

  ${({ $isSoldOut, theme }) =>
    $isSoldOut
      ? `
    color: ${theme.colors.gray_600};`
      : `color: ${theme.colors.gray_0}`};

  background-color: ${({ theme }) => theme.colors.gray_800};
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;

  ${({ checked, theme }) =>
    checked &&
    `
        background-color: ${theme.colors.gray_800};
        border: 2px solid ${theme.colors.pink_400};
      `}
`;

export const Input = styled.input`
  display: none;
`;

export const DateTimeDivider = styled.div`
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0 1rem;

  background-color: ${({ theme }) => theme.colors.gray_500};
`;

export const Text = styled.span`
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
`;

export const CustomRadio = styled.span<{ checked: boolean }>`
  position: relative;
  width: 2rem;
  height: 2rem;
  padding-right: 0.6rem;
  ${({ theme, checked }) =>
    checked
      ? `border: 6px solid ${theme.colors.pink_400}`
      : `border: 2px solid ${theme.colors.gray_300}`};

  border-radius: 100%;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: ${({ checked }) => (checked ? "block" : "none")};
    width: 1rem;
    height: 1rem;

    background-color: ${({ theme }) => theme.colors.white};
    transform: translate(-50%, -50%);
    border-radius: 50%;

    content: "";
  }
`;

export const SoldOutText = styled.span`
  color: ${({ theme }) => theme.colors.gray_600};
  ${({ theme }) => theme.fonts["body2-normal-semi"]};
`;
