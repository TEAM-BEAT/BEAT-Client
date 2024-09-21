import styled from "styled-components";
import { IconTextfiedlDelete, Switch } from "@assets/svgs";

export const CardCarouselWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19rem;
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
