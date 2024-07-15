import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 70%);
`;

export const LoadingWraper = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  width: 32.6rem;
`;

export const LoadingText = styled.div`
  width: 32.6rem;

  color: ${({ theme }) => theme.colors.gray_400};
  text-align: center;

  ${({ theme }) => theme.fonts["body1-normal-semi"]};
`;
