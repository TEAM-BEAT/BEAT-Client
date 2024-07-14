import styled from "styled-components";

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
