import { NotFoundAsset } from "@assets/svgs";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  margin-top: 17.5rem;
`;

export const NotFoundImage = styled(NotFoundAsset)`
  width: 17.6rem;
  height: 10.9rem;
`;

export const HeadingText = styled.h3`
  ${({ theme }) => theme.fonts.heading3};
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;
