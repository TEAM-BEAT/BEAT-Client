import styled from "styled-components";
import { IconImg, IconTextfiedlDelete, Switch } from "@assets/svgs";

export const CardCarouselWrapper = styled.section<{ $isDragging: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ $isDragging }) => ($isDragging ? "21rem" : "19rem")};
  height: ${({ $isDragging }) => ($isDragging ? "41.5rem" : "")};
  padding: ${({ $isDragging }) => ($isDragging ? "1rem" : "")};

  background-color: ${({ theme, $isDragging }) => ($isDragging ? theme.colors.gray_900 : null)};
  border-radius: ${({ $isDragging }) => ($isDragging ? "0.8rem" : "")};
`;

export const SwitchIcon = styled(Switch)`
  display: flex;
  width: 3.2rem;
  height: 3.2rem;
`;

export const CarouselImg = styled.section`
  position: relative;
  width: 19rem;
  height: 24.3rem;
  margin: 0.4rem 0 1.6rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const DeleteIcon = styled(IconTextfiedlDelete)`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 2;
  width: 3rem;
  height: 3rem;
`;

export const EmptyImg = styled.div`
  width: 19rem;
  height: 24.3rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 0.4rem;
`;

export const ImgIcon = styled(IconImg)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  margin: 10.2rem 7.5rem;
`;
