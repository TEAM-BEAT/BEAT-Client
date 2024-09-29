import * as S from "./AdminCarousel.styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
  const [imgIdx, setImgIdx] = useState(null);

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

  const updateImg = (value, index) => {
    setImg(value);
    setImgIdx(index);
  };

  useEffect(() => {
    console.log("useEffect called with", { link, external, img });
    // 링크 수정
    if (linkIdx !== null && linkIdx !== undefined) {
      const updatedList = carouselList.map((item, index) => {
        if (index === linkIdx) {
          return {
            ...item,
            redirectUrl: link,
            isExternal: external,
            performanceId: !external ? +link.split("/", 5)[4] : null,
          };
        }
        return item;
      });
      setCarouselList(updatedList);
      saveCarouselData(updatedList);
      console.log(updatedList);
      setLinkIdx(null);
    }

    // 사진 수정
    if (imgIdx !== null && imgIdx !== undefined) {
      const updatedList = carouselList.map((item, index) => {
        if (index === imgIdx) {
          return {
            ...item,
            promotionPhoto: img,
          };
        }
        return item;
      });
      setCarouselList(updatedList);
      saveCarouselData(updatedList);
      console.log(updatedList);
      setImgIdx(null);
    }
  }, [link, external, img]);

  // 캐러셀 이동
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const currentCarousel = [...carouselList];
    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;
    const removeTag = currentCarousel.splice(draggingItemIndex, 1);

    currentCarousel.splice(afterDragItemIndex, 0, removeTag[0]);

    saveCarouselData(currentCarousel);
    setCarouselList(currentCarousel);
  };

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="carouselCards" direction="horizontal">
          {(provided) => (
            <div className="carouselCards" {...provided.droppableProps} ref={provided.innerRef}>
              <S.CarouselContainer>
                {carouselList?.map((item, idx) => {
                  return (
                    <Draggable
                      draggableId={`carousel-${item.promotionId}`}
                      index={idx}
                      key={`carousel-${item.promotionId}`}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <CardCarousel
                              key={`${item.promotionId}-idx`}
                              index={idx}
                              carouselImg={item.promotionPhoto}
                              redirectUrl={item.redirectUrl}
                              performanceId={item.performanceId}
                              deleteCarousel={deleteCarousel}
                              handleLinkModal={handleLinkModal}
                              updateImg={updateImg}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </S.AdminCarouselWrapper>
  );
};

export default AdminCarousel;
