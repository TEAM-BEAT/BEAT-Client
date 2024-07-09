import { IconCheckboxSelectedOn, IconCheckboxUnselectedOn } from "@assets/svgs";
import styled from "styled-components";

export const ManagerCardWrapper = styled.article<{ $isDetail: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: center;
  width: 32.6rem;
  height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
`;

export const ManagerCardLayout = styled.div<{ $isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1.6rem;
  align-items: flex-start;
  width: 25.2rem;
  height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
  padding: 2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-right: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
`;

export const ManagerCardRadioLayout = styled.div<{ $isDetail: boolean; $isPaid: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 7.4rem;
  height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
  padding: 1.5rem 1.5rem 1.5rem 1.6rem;

  background-color: ${({ theme, $isPaid }) =>
    $isPaid ? theme.colors.pink_600 : theme.colors.gray_800};
  border-radius: 6px;
`;

export const ManagerCardRadioBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1rem;
  align-items: center;
  width: 4.3rem;

  cursor: pointer;
`;

export const SelectedIcon = styled(IconCheckboxSelectedOn)`
  width: 1.8rem;
  height: 1.8rem;
`;

export const UnselectedIcon = styled(IconCheckboxUnselectedOn)`
  width: 1.8rem;
  height: 1.8rem;
`;

export const ManagerCardRadioText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;
