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

  // 현재 인덱스
  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<string[]>();
  const [isSingleItem, setIsSingleItem] = useState(false);
  const [promotionImg, setPromotionImg] = useState<string[]>([]);
  const [promotionId, setPromotionId] = useState<number[]>([]);
  const [isExternal, setIsExternal] = useState<boolean[]>([]);
  const [redirectUrl, setRedirectUrl] = useState<string[]>([]);

  const carouselRef = useRef<HTMLUListElement>(null);

  const createCarouselData = (list) => ({
    photo: list.map((promotion) => promotion.promotionPhoto || ""),
    id: list.map((promotion) => promotion.performanceId || null),
    isExternal: list.map((promotion) => promotion.isExternal || null),
    redirectUrl: list.map((promotion) => promotion.redirectUrl || null),
  });

  useEffect(() => {
    const { photo, id, isExternal, redirectUrl } = createCarouselData(promotionList);

    setPromotionImg(photo);
    setPromotionId(id);
    setIsExternal(isExternal);
    setRedirectUrl(redirectUrl);
    setIsSingleItem(promotionList.length === 1);
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
      setCurrList(promotionImg);
    } else {
      const startData = promotionImg[0];
      const endData = promotionImg[promotionImg.length - 1];
      const newList = [endData, ...promotionImg, startData];

      setCurrList(newList);
    }
  }, [promotionImg, isSingleItem]);

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

        if (newIndex === promotionImg.length + 1) {
          moveToNthSlide(1);
        } else if (newIndex === 0) {
          moveToNthSlide(promotionImg.length);
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

  return (
    <S.CarouselWarpper>
      {isSingleItem ? (
        <S.CarouselLayout>
          <S.CarouselItem
            onClick={() => {
              isExternal[0]
                ? redirectUrl[0].startsWith("http://") || redirectUrl[0].startsWith("https://")
                  ? window.open(`${redirectUrl[0]}`)
                  : window.open(`https://${redirectUrl[0]}`)
                : window.open(`/gig/${promotionId[0]}`);
            }}
          >
            <img src={promotionImg[0]} alt="carousel-img" />
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
                      ? redirectUrl[idx - 1].startsWith("http://") ||
                        redirectUrl[idx - 1].startsWith("https://")
                        ? window.open(`${redirectUrl[idx - 1]}`)
                        : window.open(`https://${redirectUrl[idx - 1]}`)
                      : window.open(`/gig/${promotionId[idx - 1]}`);
                  }}
                >
                  <img src={image} alt="carousel-img" />
                </S.CarouselItem>
              );
            })}
          </S.CarouselContainer>
          {!isSingleItem && (
            <S.IndicatorContainer>
              {promotionImg.map((_, idx) => (
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
