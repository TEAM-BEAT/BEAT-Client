import styled from "styled-components";

export const BottomSheetWrapper = styled.section`
  display: flex;
`;

export const BottomSheetLayout = styled.section`
  flex-shrink: 0;
  width: 37.5rem;
  padding: 4rem 2.4rem 3.2rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 2rem 2rem 0 0;
`;

export const Title = styled.h1`
  margin-bottom: 3.2rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;
