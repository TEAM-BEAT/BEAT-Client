import styled from "styled-components";
import { CarouselPartInactive } from "@assets/svgs";

export const CarouselWarpper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const CarouselLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CarouselContainer = styled.ul`
  display: flex;
  width: 100%;
`;

export const CarouselItem = styled.button`
  flex-shrink: 0;
  width: 100%;

  list-style: none;

  img {
    width: 100%;
    height: auto;
  }
`;

export const IndicatorContainer = styled.section`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  display: flex;
  gap: 0.5rem;

  transform: translateX(-50%);
`;

export const Indicator = styled(CarouselPartInactive)<{ active: boolean }>`
  width: 0.4rem;
  height: 0.4rem;

  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.gray_700)};

  transition: background-color 0.3s ease;
`;
