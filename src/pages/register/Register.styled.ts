import { Generators } from "@styles/generator";
import styled from "styled-components";

export const RegisterCompleteLayout = styled.section`
  width: 37.4rem;
  padding: 2.4rem;
`;

export const RegisterCompleteWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12rem 2.4rem 22rem;
`;

export const RegisterCompleteTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading3}
  text-align: center;
`;

export const ReigsterCompleteSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]}
  text-align: center;
`;

export const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
