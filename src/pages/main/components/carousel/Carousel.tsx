import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Carousel.styled";

interface PromotionProps {
  promotionId?: number;
  promotionPhoto?: string;
  performanceId?: number;
}

interface PromotionComponentProps {
  promotionList: PromotionProps[];
}

const Carousel = ({ promotionList }: PromotionComponentProps) => {
  const navigate = useNavigate();

  const carouselList = promotionList.map((promotion) => promotion.promotionPhoto || "");
  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<string[]>();

  const carouselRef = useRef<HTMLUListElement>(null);

  // 인덱스 번호 변경
  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = "";
      }
    }, 500);
  };

  // 슬라이드 이동할 때 무한 + 어색하지 않도록 처음과 끝 반복
  useEffect(() => {
    if (carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrList(newList);
    }
  }, [carouselList]);

  // idx 변경되면 위치 이동
  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%)`;
    }
  }, [currIndex]);

  // 5초마다 타이머 실행 -> 5초에 한 번씩 idx 변경
  useEffect(() => {
    const time = setTimeout(() => {
      const newIndex = currIndex + 1;

      if (newIndex === carouselList.length + 1) {
        moveToNthSlide(1);
      } else if (newIndex === 0) {
        moveToNthSlide(carouselList.length);
      }

      setCurrIndex((prev) => prev + 1);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = "all 0.5s ease-in-out";
      }
    }, 3000);
    return () => {
      clearInterval(time);
    };
  }, [currIndex]);

  return (
    <S.CarouselWarpper>
      <S.CarouselLayout>
        <S.CarouselContainer ref={carouselRef}>
          {currList?.map((image, idx) => {
            const key = `${image}-${idx}`;

            return (
              <S.CarouselItem
                key={key}
                onClick={() => {
                  navigate(`/gig/${1}`);
                }}
              >
                <img src={image} alt="carousel-img" />
              </S.CarouselItem>
            );
          })}
        </S.CarouselContainer>
        <S.IndicatorContainer>
          {carouselList.map((_, idx) => (
            <S.Indicator key={idx} active={currIndex === idx + 1} />
          ))}
        </S.IndicatorContainer>
      </S.CarouselLayout>
    </S.CarouselWarpper>
  );
};

export default Carousel;
