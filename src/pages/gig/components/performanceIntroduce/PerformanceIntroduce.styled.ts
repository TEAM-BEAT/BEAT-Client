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

export const MapInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
  width: 32.7rem;
`;

export const MapDescBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-start;
  align-self: stretch;
`;

export const SubTitleWithDesc = styled.div`
  position: relative;
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  max-width: 32.7rem;
`;

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const Desc = styled.p`
  max-width: 24.5rem;
  max-height: 4.4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-long"]};
`;

export const Copy = styled.p`
  position: absolute;
  top: 0.4rem;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0.8rem;

  color: ${({ theme }) => theme.colors.pink_200};

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  cursor: pointer;
`;

export const KakaoMap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32.7rem;
  height: 18rem;

  border-radius: 6px;
`;

export const Description = styled.pre`
  width: 32.7rem;

  ${({ theme }) => theme.fonts["body2-long"]};
  color: ${({ theme }) => theme.colors.white};
  white-space: pre-line;
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 0;
  text-decoration-line: underline;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body2-long"]};
  cursor: pointer;
`;

export const IconCopy = styled(IcomCopy)<{ $width: number; $height: number }>`
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
`;
