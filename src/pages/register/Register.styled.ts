import styled from "styled-components";

// 페이지 전체 레이아웃
export const RegisterContainer = styled.main`
  padding: 0 2.4rem;
`;

// 입력 Box
export const InputRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const InputTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;
