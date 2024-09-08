import { useState } from "react";
import { PerformanceImageList } from "../content/Content";
import Contact from "./Contact";
import * as S from "./PerformanceIntroduce.styled";
import DetailImage from "../detailImage/DetailImage";

interface PerformanceIntroduceProps {
  description: string;
  performanceImageList: PerformanceImageList[];
  attentionNote: string;
  contact: string;
}

const PerformanceIntroduce = ({
  description,
  performanceImageList,
  attentionNote,
  contact,
}: PerformanceIntroduceProps) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>공연소개</S.Title>
        <S.Description>{description}</S.Description>
      </S.Container>
      <DetailImage performanceImageList={performanceImageList} />
      <S.Divider />
      <S.Container>
        <S.Title>유의사항</S.Title>
        <S.Description>{attentionNote}</S.Description>
      </S.Container>
      <S.Divider />
      <Contact contact={contact} />
    </S.Wrapper>
  );
};

export default PerformanceIntroduce;
