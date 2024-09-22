import * as S from "./AdminCarousel.styled";
import CardCarousel from "../cardCarousel/CardCarousel";
import { useEffect, useState } from "react";
import LinkModal from "@admin/compontets/commons/linkModal/LinkModal";

const promotionListTest = [
  {
    isExternal: true,
    performanceId: null,
    promotionId: 2,
    promotionPhoto:
      "https://avatars.githubusercontent.com/u/58854041?s=400&u=fdb4a8dbf5b7ec8d7f327954a4ca97e064b560ee&v=4",
    redirectUrl: "https://github.com/pepperdad",
  },
  {
    isExternal: false,
    performanceId: 56,
    promotionId: 1,
    promotionPhoto:
      "https://beat-dev-bucket.s3.ap-northeast-2.amazonaws.com/poster/8a8efe39-83bf-47b6-b40d-256164928ce7-poster-1723813907142",
    redirectUrl: null,
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 3,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 4,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
  {
    isExternal: true,
    performanceId: 58,
    promotionId: 5,
    promotionPhoto: "https://avatars.githubusercontent.com/u/66528589?v=4",
    redirectUrl: "https://github.com/sinji2102",
  },
];

interface PromotionProps {
  promotionId?: number;
  promotionPhoto?: string;
  performanceId?: number;
  isExternal?: boolean;
  redirectUrl?: string;
}

const AdminCarousel = () => {
  const [carouselList, setCarouselList] = useState<PromotionProps[]>();
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkIdx, setLinkIdx] = useState(null);
  const [link, setLink] = useState("");
  const [external, setExternal] = useState();

  useEffect(() => {
    setCarouselList(promotionListTest);
  }, []);

  const addCarousel = () => {
    const newCarousel = {
      promotionId: carouselList.length,
      promotionPhoto: null,
      performanceId: null,
      isExternal: false,
      redirectUrl: null,
    };

    const updatedCarouselList = [...carouselList, newCarousel];

    setCarouselList(updatedCarouselList);
  };

  const deleteCarousel = (idx: number) => {
    const updatedCarouselList = carouselList.filter((_, index) => index !== idx);
    setCarouselList(updatedCarouselList);
  };

  const handleLinkModal = (value?: number | null) => {
    setOpenLinkModal(!openLinkModal);

    if (value !== null && value !== undefined) {
      setLinkIdx(value);
    }
  };

  const updateLink = (value) => {
    setLink(value);
  };

  const updateExternal = (value) => {
    setExternal(value);
  };

  useEffect(() => {
    if (linkIdx !== null && linkIdx !== undefined) {
      const updatedList = carouselList.map((item, index) => {
        // 외부, 내부 링크 구분해서 저장
        if (index === linkIdx && external) {
          return {
            ...item,
            redirectUrl: link,
            isExternal: external,
            performanceId: null,
          };
        } else if (index === linkIdx && !external) {
          return {
            ...item,
            redirectUrl: null,
            isExternal: external,
            performanceId: +link.split("/", 5)[4],
          };
        }
        return item;
      });
      setCarouselList(updatedList);
    }
  }, [link, external]);

  return (
    <S.AdminCarouselWrapper>
      {openLinkModal && (
        <LinkModal
          updateLink={updateLink}
          updateExternal={updateExternal}
          handleLinkModal={handleLinkModal}
          redirectUrl={carouselList[linkIdx]?.redirectUrl}
          isExternal={carouselList[linkIdx]?.isExternal}
          performanceId={carouselList[linkIdx]?.performanceId}
        />
      )}
      <S.Notification>
        *캐러셀은 왼쪽부터 순서대로 노출되며, 최대 7개 등록 가능합니다.
      </S.Notification>
      <S.CarouselContainer>
        {carouselList?.map((item, idx) => {
          return (
            <CardCarousel
              index={idx}
              carouselImg={item.promotionPhoto}
              redirectUrl={item.redirectUrl}
              performanceId={item.performanceId}
              deleteCarousel={deleteCarousel}
              handleLinkModal={handleLinkModal}
            />
          );
        })}
        {carouselList?.length <= 6 && (
          <S.AddCarouselContainer
            onClick={() => {
              addCarousel();
            }}
          >
            <S.AddIcon />
            <S.AddText>추가하기</S.AddText>
          </S.AddCarouselContainer>
        )}
      </S.CarouselContainer>
    </S.AdminCarouselWrapper>
  );
};

export default AdminCarousel;
