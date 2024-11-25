import styled from "styled-components";
import { IcDelete } from "@assets/svgs";

export const SelectedChipsWrapper = styled.section`
  display: flex;
  gap: 0.8rem;
  width: 32.7rem;
  overflow-x: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
`;

export const Chip = styled.section`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
  width: auto;
  margin-top: 1.6rem;
  padding: 0.8rem 1.2rem;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_200};

  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 9.9rem;
`;

// delete icon 확인하기
export const DeleteIcon = styled(IcDelete)`
  width: 1.6rem;
  height: 1.6rem;
`;
