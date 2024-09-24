import * as S from "./AdminCarousel.styled";
import CardCarousel from "../cardCarousel/CardCarousel";
import { useEffect, useState } from "react";
import LinkModal from "@admin/compontets/commons/linkModal/LinkModal";
import { useGetAllScheduleList } from "@apis/domains/home/queries";

interface PromotionProps {
  promotionId?: number;
  promotionPhoto?: string;
  performanceId?: number;
  isExternal?: boolean;
  redirectUrl?: string;
}

const AdminCarousel = ({ saveCarouselData }) => {
  const { data } = useGetAllScheduleList();

  const [carouselList, setCarouselList] = useState<PromotionProps[]>();
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkIdx, setLinkIdx] = useState(null); // 변경하고자 하는 캐러셀 인덱스
  const [link, setLink] = useState("");
  const [external, setExternal] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    setCarouselList(data?.promotionList);
  }, [data]);

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

  const updateImg = (value) => {
    setImg(value);
  };

  // 링크 수정
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
            promotionPhoto: img,
          };
        } else if (index === linkIdx && !external) {
          return {
            ...item,
            redirectUrl: null,
            isExternal: external,
            performanceId: +link.split("/", 5)[4],
            promotionPhoto: img,
          };
        }
        return item;
      });
      setCarouselList(updatedList);
      saveCarouselData(updatedList);
      console.log(updatedList);
    }
  }, [link, external, img]);

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
              key={`${item.promotionId}-idx`}
              index={idx}
              carouselImg={item.promotionPhoto}
              redirectUrl={item.redirectUrl}
              performanceId={item.performanceId}
              deleteCarousel={deleteCarousel}
              handleLinkModal={handleLinkModal}
              updateImg={updateImg}
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
