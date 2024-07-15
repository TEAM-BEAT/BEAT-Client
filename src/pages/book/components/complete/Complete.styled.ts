import styled from "styled-components";

export const Wrapper = styled.section`
  min-height: calc(100vh - 156px);
  padding: 0 2.4rem 2.4rem;
`;
export const Title = styled.h1`
  ${({ theme }) => theme.fonts.heading3};
  color: ${({ theme }) => theme.colors.white};
  white-space: pre-line;
  text-align: center;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  text-align: center;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const FloatingWrapper = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const GigButtonBox = styled.button`
  padding: 1.2rem;
`;

export const GigText = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  text-decoration-line: underline;
`;
