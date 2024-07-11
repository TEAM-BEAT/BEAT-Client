import styled, { css } from "styled-components";

export const TabContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.3rem;
  padding: 0.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  z-index: 1;
  width: 15.6rem;
  height: 3.6rem;
  padding: 0 2rem;

  text-align: center;

  cursor: pointer;

  ${({ theme }) => theme.fonts["body2-normal-semi"]};
  transition: color 0.3s;
  ${({ $isActive }) =>
    $isActive
      ? css`
          color: ${({ theme }) => theme.colors.white};
        `
      : css`
          color: ${({ theme }) => theme.colors.gray_300};
        `}
`;

export const Underline = styled.div<{ $activeTab: string }>`
  position: absolute;
  bottom: 0.6rem;
  width: 15.6rem;
  height: 3.6rem;

  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 4px;

  transition: transform 0.5s;
  ${({ $activeTab }) =>
    $activeTab === "performance"
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(102%);
        `}
`;
