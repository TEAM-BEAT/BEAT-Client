import styled from "styled-components";

export const BodyWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37.4rem;
  height: 66.4rem;
`;

export const BodyLayout = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  width: 32.6rem;
  height: auto;
`;

export const GrapicImg = styled.div`
  width: 12.6rem;
  height: 12.6rem;

  /* background-image: ; 나중에 얘로 대체 예정 */
  background-color: red;
  border-radius: 10px;
`;

export const NothingText = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1.1rem;

  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 2.4rem;
`;
