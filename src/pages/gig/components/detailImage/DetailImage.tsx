import { useState } from "react";
import { IconArrowDown, IconArrowUp } from "@assets/svgs";
import * as S from "./DetailImage.styled";

const DetailImage = ({ performanceImageList }) => {
  const toggleAvailable = performanceImageList?.length > 2;
  const [showAllImages, setShowAllImages] = useState(false);

  const handleDetailImageToggle = () => {
    setShowAllImages((prev) => !prev);
  };

  if (!performanceImageList || performanceImageList.length === 0) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.ImageWrapper $showAllImages={showAllImages} $toggleAvailable={toggleAvailable}>
        {performanceImageList.map((image) => (
          <S.Image key={image.performanceImageId} src={image.performanceImage} />
        ))}
      </S.ImageWrapper>

      {toggleAvailable && (
        <>
          {!showAllImages && <S.Overlay />}
          <S.ShowMoreButton onClick={handleDetailImageToggle}>
            {showAllImages ? (
              <>
                <span>상세 이미지 접기</span> <IconArrowUp width={"24px"} />
              </>
            ) : (
              <>
                <span>상세 이미지 더보기</span> <IconArrowDown width={"24px"} />
              </>
            )}
          </S.ShowMoreButton>
        </>
      )}
    </S.Wrapper>
  );
};

export default DetailImage;
