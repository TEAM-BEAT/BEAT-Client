import styled from "styled-components";

import { IcomCopy } from "@assets/svgs";

export const PhoneNumWrapper = styled.section`
  width: auto;
`;

export const PhoneNumLayout = styled.button`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

export const PhoneNum = styled.section`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body1-normal-medi"]};

  text-decoration-line: underline;
`;

export const Copy = styled(IcomCopy)`
  width: 2.4rem;
  height: 2.4rem;
`;
