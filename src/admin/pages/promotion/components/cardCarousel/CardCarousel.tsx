import React from "react";
import * as S from "./CardCarousel.styled";
import { Spacing } from "@components/commons";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import LinkButton from "@admin/compontets/commons/linkButton/LinkButton";

const CardCarousel = ({ index, carouselImg, redirectUrl, deleteCarousel }) => {
  return (
    <S.CardCarouselWrapper>
      <S.SwitchIcon />
      <S.CarouselImg>
        <S.DeleteIcon
          onClick={() => {
            deleteCarousel(index);
          }}
        />
        <img src={carouselImg} alt="carousel-img" />
      </S.CarouselImg>
      <AdminButton variant="line">이미지 변경</AdminButton>
      <Spacing marginBottom="0.8" />
      <LinkButton>{redirectUrl}</LinkButton>
      <Spacing marginBottom="4.8" />
    </S.CardCarouselWrapper>
  );
};

export default CardCarousel;
