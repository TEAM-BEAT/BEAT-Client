import styled from "styled-components";
import { IconRoleAdd } from "@assets/svgs";

export const AdminCarouselWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Notification = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-long"]};
`;

export const CarouselContainer = styled.section`
  display: flex;
  gap: 2.4rem;
  width: 111.2rem;
  margin-top: 3.2rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    width: 111.2rem;
    height: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    width: 88.9rem;

    background: ${({ theme }) => theme.colors.gray_700};
    border-radius: 3.2rem;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray_900};
    border-radius: 3.2rem;
  }
`;

export const AddCarouselContainer = styled.button`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.8rem;
  align-items: center;
  width: 19rem;
  height: 36.5rem;
  margin-top: 3.6rem;
  padding: 15.8rem 0 13.1rem;

  background-color: ${({ theme }) => theme.colors.black};
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 0.4rem;
`;

export const AddIcon = styled(IconRoleAdd)`
  width: 4.8rem;
  height: 4.8rem;
`;

export const AddText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts["body2-normal-semi"]};

  color: ${({ theme }) => theme.colors.gray_600};
`;
