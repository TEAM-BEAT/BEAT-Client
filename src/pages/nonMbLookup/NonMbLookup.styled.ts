import styled from "styled-components";

export const NonMbLookupWrapper = styled.section`
  width: auto;
  height: 100%;

  /*  812(전체) - 44(상단) */
  min-height: 77.8rem;
`;

export const BtnLayout = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
