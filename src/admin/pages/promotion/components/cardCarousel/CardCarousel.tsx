import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import * as S from "./CardCarousel.styled";
import { Spacing } from "@components/commons";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";
import LinkButton from "@admin/compontets/commons/linkButton/LinkButton";

const CardCarousel = ({ index, carouselImg, redirectUrl, deleteCarousel, handleLinkModal }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [postImg, setPostImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(carouselImg);

  const fileHandler = () => {
    if (ref.current) {
      ref.current!.click();
    }
  };

  useEffect(() => {
    setImgUrl(carouselImg || null);
  }, [carouselImg]);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const newImageUrl = event.target?.result as string;
        setPostImg(file);
        setImgUrl(newImageUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <S.CardCarouselWrapper>
      <S.SwitchIcon />
      <S.CarouselImg>
        <S.DeleteIcon
          onClick={() => {
            deleteCarousel(index);
          }}
        />
        {imgUrl ? (
          <img src={imgUrl} alt="carousel-img" />
        ) : (
          <S.EmptyImg>
            <S.ImgIcon />
          </S.EmptyImg>
        )}
      </S.CarouselImg>
      <AdminButton variant="line" onClick={fileHandler}>
        <input
          type="file"
          ref={ref}
          accept="image/png, image/jpg, image/jpeg, image/svg"
          style={{ display: "none" }}
          onChange={uploadFile}
        />
        {carouselImg ? "이미지 변경" : "이미지 등록"}
      </AdminButton>
      <Spacing marginBottom="0.8" />
      <LinkButton
        onClick={() => {
          handleLinkModal(index);
        }}
      >
        {redirectUrl}
      </LinkButton>
      <Spacing marginBottom="4.8" />
    </S.CardCarouselWrapper>
  );
};

export default CardCarousel;
