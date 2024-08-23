import { TouchEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Carousel.styled";

interface PromotionProps {
  promotionId?: number;
  promotionPhoto?: string;
  performanceId?: number;
  isExternal?: boolean;
  redirectUrl?: string;
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
  const [isSingleItem, setIsSingleItem] = useState(false);
  const [isExternal, setIsExternal] = useState<boolean[]>([]);
  const [redirectUrl, setRedirectUrl] = useState<string[]>([]);

  const carouselRef = useRef<HTMLUListElement>(null);

  const promotionListTest = [
    {
      isExternal: false,
      performanceId: 56,
      promotionId: 5,
      promotionPhoto:
        "https://beat-dev-bucket.s3.ap-northeast-2.amazonaws.com/poster/8a8efe39-83bf-47b6-b40d-256164928ce7-poster-1723813907142",
      redirectUrl: null,
    },
    {
      isExternal: true,
      performanceId: 57,
      promotionId: 6,
      promotionPhoto:
        "https://avatars.githubusercontent.com/u/58854041?s=400&u=fdb4a8dbf5b7ec8d7f327954a4ca97e064b560ee&v=4",
      redirectUrl: "https://github.com/pepperdad",
    },
    {
      isExternal: true,
      performanceId: 58,
      promotionId: 7,
      promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
      redirectUrl: "https://github.com/sinji2102",
    },
  ];

  useEffect(() => {
    // const carouselTempList = promotionList.map((promotion) => promotion.promotionPhoto || "");
    // const carouselItemList = promotionList.map((promotion) => promotion.performanceId || null);
    // const externalList = promotionList.map((promotion) => promotion.isExternal || null);
    // const redirectUrlList = promotionList.map((promotion) => promotion.redirectUrl || null);

    const carouselTempList = promotionListTest.map((promotion) => promotion.promotionPhoto || "");
    const carouselItemList = promotionListTest.map((promotion) => promotion.performanceId || null);
    const externalList = promotionListTest.map((promotion) => promotion.isExternal || null);
    const redirectUrlList = promotionListTest.map((promotion) => promotion.redirectUrl || null);

    setCarouselId(carouselItemList);
    setCarouselList(carouselTempList);
    setIsExternal(externalList);
    setRedirectUrl(redirectUrlList);

    // 항목이 하나만 들어온 경우
    setIsSingleItem(promotionList.length === 0);
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
    if (isSingleItem) {
      setCurrList(carouselList);
    } else {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrList(newList);
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

  return (
    <S.CarouselWarpper>
      {isSingleItem ? (
        <S.CarouselLayout>
          <S.CarouselItem
            onClick={() => {
              isExternal[0] ? window.open(`${redirectUrl[0]}`) : navigate(`/gig/${carouselId[0]}`);
            }}
          >
            <img src={carouselList[0]} alt="carousel-img" />
          </S.CarouselItem>
        </S.CarouselLayout>
      ) : (
        <S.CarouselLayout>
          <S.CarouselContainer ref={carouselRef}>
            {currList?.map((image, idx) => {
              const key = `${image}-${idx}`;

              return (
                <S.CarouselItem
                  key={key}
                  onClick={() => {
                    isExternal[idx - 1]
                      ? window.open(`${redirectUrl[idx - 1]}`)
                      : navigate(`/gig/${carouselId[idx - 1]}`);
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
