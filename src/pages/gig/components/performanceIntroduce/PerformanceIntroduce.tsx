import { useState } from "react";
import { PerformanceImageList } from "../content/Content";
import Contact from "./Contact";
import * as S from "./PerformanceIntroduce.styled";
import DetailImage from "../detailImage/DetailImage";
import { Toast } from "@components/commons";
import { useToast } from "@hooks";
import { IconCheck } from "@assets/svgs";

interface PerformanceIntroduceProps {
  description: string;
  performanceImageList: PerformanceImageList[];
  attentionNote: string;
  contact: string;
  performanceVenue: string;
  roadAddressName: string;
  placeDetailAddress: string;
  latitude: string;
  longtitude: string;
}

const PerformanceIntroduce = ({
  description,
  performanceImageList,
  attentionNote,
  contact,
  performanceVenue,
  roadAddressName,
  placeDetailAddress,
  latitude,
  longtitude,
}: PerformanceIntroduceProps) => {
  const { showToast, isToastVisible } = useToast();
  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  const fullAddress = `${roadAddressName} ${placeDetailAddress}`;

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Title>공연소개</S.Title>
          <S.Description>{description}</S.Description>
        </S.Container>
        <DetailImage performanceImageList={performanceImageList} />
        <S.MapInfo>
          <S.Title>공연장 정보</S.Title>
          <S.MapDescBox>
            <S.SubTitleWithDesc>
              <S.SubTitle>장소</S.SubTitle>
              <S.Desc>{performanceVenue}</S.Desc>
            </S.SubTitleWithDesc>
            <S.SubTitleWithDesc>
              <S.SubTitle>주소</S.SubTitle>
              <S.Desc>{fullAddress}</S.Desc>
              <S.Copy onClick={() => handleCopyClipBoard(fullAddress || "")}>복사</S.Copy>
            </S.SubTitleWithDesc>
          </S.MapDescBox>
        </S.MapInfo>
        <S.Divider />
        <S.Container>
          <S.Title>유의사항</S.Title>
          <S.Description>{attentionNote}</S.Description>
        </S.Container>
        <S.Divider />
        <Contact contact={contact} />
      </S.Wrapper>
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
        클립보드에 복사되었습니다!
      </Toast>
    </>
  );
};

export default PerformanceIntroduce;
