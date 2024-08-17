import { TouchEventHandler, useEffect, useRef, useState } from "react";
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

let touchStartX: number;
let touchEndX: number;

const Carousel = ({ promotionList }: PromotionComponentProps) => {
  const navigate = useNavigate();

  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<string[]>();
  const [carouselList, setCarouselList] = useState<string[]>([]);
  const [carouselId, setCarouselId] = useState<number[]>([]);
  const [isSingleItem, setIsSingleItem] = useState(false); // 항목이 하나인지 여부를 저장하는 상태

  const carouselRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const carouselTempList = promotionList.map((promotion) => promotion.promotionPhoto || "");
    const carouselItemList = promotionList.map((promotion) => promotion.performanceId || null);

    setCarouselId(carouselItemList);
    setCarouselList(carouselTempList);

    // 항목이 하나만 들어온 경우
    if (carouselTempList.length === 1) {
      setIsSingleItem(true); // 항목이 하나인 경우 상태 변경
    } else {
      setIsSingleItem(false); // 여러 개일 경우 상태 리셋
    }
  }, [promotionList]);

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
    if (!isSingleItem && carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrList(newList);
    } else if (isSingleItem) {
      setCurrList(carouselList); // 항목이 하나일 경우, 슬라이드 없이 그대로 보여줌
    }
  }, [carouselList, isSingleItem]);

  // idx 변경되면 위치 이동
  useEffect(() => {
    if (!isSingleItem && carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%)`;
    }
  }, [currIndex, isSingleItem]);

  // 5초마다 타이머 실행 -> 5초에 한 번씩 idx 변경
  useEffect(() => {
    if (!isSingleItem) {
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
    }
  }, [currIndex, isSingleItem]);

  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;

    if (newIndex === carouselList.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(carouselList.length);
    }

    setCurrIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = "all 0.5s ease-in-out";
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isSingleItem) {
      touchStartX = e.touches[0].clientX;
    }
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isSingleItem) {
      const currTouchX = e.nativeEvent.changedTouches[0].clientX;

      if (carouselRef.current !== null) {
        carouselRef.current.style.transform = `translateX(calc(-${currIndex}00% - ${
          (touchStartX - currTouchX) * 2 || 0
        }px))`;
      }
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isSingleItem) {
      touchEndX = e.changedTouches[0].clientX;

      if (touchStartX >= touchEndX) {
        handleSwipe(1);
      } else {
        handleSwipe(-1);
      }
    }
  };

  return (
    <S.CarouselWarpper>
      {isSingleItem ? (
        <S.CarouselLayout>
          <S.CarouselItem
            onClick={() => {
              navigate(`${carouselId[0]}`);
            }}
          >
            <img src={carouselList[0]} alt="carousel-img" />
          </S.CarouselItem>
        </S.CarouselLayout>
      ) : (
        <S.CarouselLayout
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <S.CarouselContainer ref={carouselRef}>
            {currList?.map((image, idx) => {
              const key = `${image}-${idx}`;

              return (
                <S.CarouselItem
                  key={key}
                  onClick={() => {
                    navigate(`/gig/${carouselId[idx - 1]}`);
                  }}
                >
                  <img src={image} alt="carousel-img" />
                </S.CarouselItem>
              );
            })}
          </S.CarouselContainer>
          {!isSingleItem && (
            <S.IndicatorContainer>
              {carouselList.map((_, idx) => (
                <S.Indicator key={idx} active={currIndex === idx + 1} />
              ))}
            </S.IndicatorContainer>
          )}
        </S.CarouselLayout>
      )}
    </S.CarouselWarpper>
  );
};

export default Carousel;
