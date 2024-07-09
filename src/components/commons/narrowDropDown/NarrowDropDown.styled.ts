import SvgIconChevronBack from "@assets/svgs/IconChevronBack";
import styled, { css } from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.6rem;
  align-items: center;
  height: 4rem;
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;

  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 0.4rem;
`;

export const DropDownButtonContent = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const ButtonContentSpan = styled.span`
  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const SvgIcon = styled(SvgIconChevronBack)<{ $rotate: boolean }>`
  width: 16px;
  height: 16px;

  transform: rotate(180deg);

  ${(prop) =>
    prop.$rotate &&
    css`
      transform: rotate(360deg);
    `}
`;

export const DropdownContentWrapper = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-shrink: 0;
  gap: 0.6rem;
  align-items: center;
  width: 10.2rem;
  margin-top: 0.8rem;
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 0.4rem;
`;

export const DropdownContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
  justify-content: center;
`;

export const DropdownContentButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  width: 6.8rem;

  /* 피그마에서는 겹치는 부분이 제대로 계산 안되서, 개발하면서 적당히 줄여둠 */
  padding: 0.2rem 0 0.6rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_700};
`;

export const DropdownContentText = styled.span`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  align-self: stretch;
  justify-content: flex-start;

  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 12px 16px;

  color: black;
  text-decoration: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;
