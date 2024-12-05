import styled from "styled-components";
import { IcomCopy } from "@assets/svgs";

export const ManageAccountWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 29.9rem;
  height: 4.8rem;
  margin: 0.8rem 0 0.4rem 2.8rem;
  padding: 0.8rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["caption1-medi"]};

  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 0.6rem;
`;

export const CopyIcon = styled(IcomCopy)`
  width: 2.4rem;
  height: 2.4rem;

  path {
    fill: ${({ theme }) => theme.colors.gray_300};
  }
`;
