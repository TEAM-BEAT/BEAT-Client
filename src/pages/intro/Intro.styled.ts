import styled from "styled-components";

export const StyledIntroImg = styled.img`
  width: 37.5rem;
  min-height: 100vh;
`;

export const FooterContainer = styled.div`
  position: relative;

  /* 구분선 없애기 위해서 조금 올려주었습니다. */
  bottom: 0.2rem;
  padding: 1.6rem 2.4rem 4rem;

  background-color: ${({ theme }) => theme.colors.black};
`;
