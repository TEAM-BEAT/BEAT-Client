import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.6rem 0 0;
`;

export const HyperLinkText = styled.a`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts["body2-normal-semi"]};
  text-decoration: underline;
`;

export const HyperLinkSpan = styled.span`
  margin-left: 0.2rem;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const StyledCheckbox = styled.input`
  position: relative;
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;

  background-color: transparent;
  outline: none;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 2px;

  accent-color: red;

  &:checked {
    background-color: ${({ theme }) => theme.colors.pink_400};
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
    border-color: transparent;
  }
`;
