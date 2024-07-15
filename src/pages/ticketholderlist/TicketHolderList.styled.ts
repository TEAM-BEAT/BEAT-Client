import { IconToggleOff, IconToggleOn } from "@assets/svgs";
import styled from "styled-components";

export const BodyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 37.4rem;
  height: auto;
  min-height: 60.8rem; /* 60.8rem(body의 높이) +  5.6rem(버튼의 높이) */
  margin-bottom: 10.4rem;
  padding: 2.4rem;
`;

export const BodyLayout = styled.section`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 2.4rem;
  align-items: flex-start;
`;

export const LayoutHeaderBox = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: flex-end;
  align-self: stretch;
`;

export const LayoutFilterBox = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const ToggleText = styled.span`
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const ToggleButton = styled.button<{ $detail: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 5.6rem;
  height: 3.3rem;

  background-color: ${({ theme, $detail }) =>
    $detail ? theme.colors.pink_500 : theme.colors.gray_700};
  cursor: pointer;
  border: none;
  border-radius: 36px;
`;

export const Circle = styled.span<{ $detail: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ $detail }) => ($detail ? "4rem" : "1.6rem")};
  width: 2.7rem;
  height: 2.7rem;

  background-color: ${({ theme }) => theme.colors.white};
  transform: translate(-50%, -50%);
  border-radius: 50%;

  transition: left 0.25s ease-in-out; /* left 속성은 변하게 된다면 이 애니메이션 적용 */
`;

export const ToggleOnIcon = styled(IconToggleOn)<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

export const ToggleOffIcon = styled(IconToggleOff)<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

export const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37.4rem;
  height: 10.4rem;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
  transform: translate(-50%, 0);
`;
