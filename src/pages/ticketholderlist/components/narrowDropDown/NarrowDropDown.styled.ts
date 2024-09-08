import SvgIconChevronBack from "@assets/svgs/IconChevronBack";
import styled, { css } from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownButton = styled.button<{ $isChoosed: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.6rem;
  align-items: center;
  min-width: 9.3rem;
  height: 4rem;
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;

  /* border: 1px solid
    ${({ theme, $isChoosed }) => ($isChoosed ? theme.colors.gray_0 : theme.colors.gray_700)}; */
  border-radius: 0.4rem;
`;

export const DropDownButtonContent = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  position: absolute;
  top: 4.06rem; /* 버튼의 높이 3.26rem + 간격 0.8rem */
  z-index: 1;
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-shrink: 0;
  gap: 0.6rem;
  align-items: center;
  width: 9.2rem;
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

export const DropdownContentButton = styled.button<{ $isLast: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  width: 6.8rem;

  /* 피그마에서는 겹치는 부분이 제대로 계산 안되서, 개발하면서 적당히 줄여둠 */
  padding: 0.2rem 0 0.6rem;

  ${({ $isLast }) =>
    !$isLast &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray_700};
    `}
`;

export const DropdownContentText = styled.span<{
  $selected: boolean;
}>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  align-self: stretch;
  justify-content: flex-start;

  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  ${({ $selected }) =>
    $selected &&
    css`
      color: ${({ theme }) => theme.colors.pink_400};
    `}
`;
