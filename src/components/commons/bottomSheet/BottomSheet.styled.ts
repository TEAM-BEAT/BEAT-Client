import styled from "styled-components";

export const BottomSheetWrapper = styled.section`
  position: fixed;
  bottom: 0;
  z-index: 1;
  display: flex;
`;

export const BottomSheetLayout = styled.section`
  width: 37.5rem;
  padding: 3.6rem 2.4rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 2rem 2rem 0 0;
`;

export const Title = styled.h1`
  margin-bottom: 2.8rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;
