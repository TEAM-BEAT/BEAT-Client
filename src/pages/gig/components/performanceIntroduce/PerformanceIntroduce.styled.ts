import { IcomCopy } from "@assets/svgs";
import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts["heading4"]};
  color: ${({ theme }) => theme.colors.gray_400};
`;

export const Description = styled.p`
  ${({ theme }) => theme.fonts["body2-long"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const Divider = styled.div`
  width: 32.7rem;
  height: 0.1rem;

  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const ContactContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContactTitleBox = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  width: 100%;
`;

export const Toggle = styled.span`
  width: 2.4rem;
  height: 2.4rem;

  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.colors.gray_400};
  }
`;

export const Contact = styled.p`
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 0;
  text-decoration-line: underline;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body2-long"]};
  cursor: pointer;
`;

export const IconCopy = styled(IcomCopy)<{ $width: number; $height: number }>`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
`;
