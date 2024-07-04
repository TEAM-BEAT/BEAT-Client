import styled from "styled-components";

export const Container = styled.div`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts.heading1};
`;
