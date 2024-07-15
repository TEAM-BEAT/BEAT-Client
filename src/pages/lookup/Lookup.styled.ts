import styled from "styled-components";

export const LookupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 0;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
