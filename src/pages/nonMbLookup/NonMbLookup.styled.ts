import styled from "styled-components";

export const NonMbLookupWrapper = styled.section`
  width: auto;
  height: 100%;
  min-height: 66.4rem;
`;

export const BtnLayout = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
