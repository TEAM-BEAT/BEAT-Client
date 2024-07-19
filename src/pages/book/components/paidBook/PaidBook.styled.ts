import { IcomCopy } from "@assets/svgs";
import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 0.8rem;
  padding: 1.2rem;
`;

export const GigText = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  text-align: center;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  text-decoration-line: underline;
`;

export const DepositContainer = styled.section`
  padding: 20px 16px;

  background: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const CopyIcon = styled(IcomCopy)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const DepositBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
`;

export const PinkText = styled.p`
  color: ${({ theme }) => theme.colors.pink_300};
  text-align: center;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;
