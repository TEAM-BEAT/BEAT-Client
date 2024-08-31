import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../Register.styled";
import { IconCamera } from "@assets/svgs";
import Spacing from "@components/commons/spacing/Spacing";
import ImageEditor from "@components/commons/imageEditor/ImageEditor";

interface PosterThumbnailProps {
  value?: string | undefined;
  onImageUpload: (imageUrl: string) => void;
}

const PosterThumbnail = ({ value, onImageUpload }: PosterThumbnailProps) => {
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(value || null);
  const [inputKey, setInputKey] = useState<number>(Date.now());
  const [openImageModal, setOpenImageModal] = useState(false);

  useEffect(() => {
    setPreviewImg(value || null);
  }, [value]);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setPostImg(file);
        setPreviewImg(imageUrl);
        onImageUpload(imageUrl);
        setOpenImageModal(true);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPostImg(null);
    setPreviewImg(null);
    setInputKey(Date.now());
    onImageUpload("");
  };

  // ImageEditor에서 크롭된 이미지 URL을 받아서 상태 업데이트
  const handleCroppedImage = (croppedImageUrl: string) => {
    setPreviewImg(croppedImageUrl);
    setOpenImageModal(false); // 모달 닫기
    onImageUpload(croppedImageUrl); // 부모 컴포넌트로 전달
  };

  return (
    <>
      <S.InputRegisterBox $marginBottom={2.8}>
        <S.InputTitle>포스터 썸네일</S.InputTitle>
        <S.InputDescription>한 장만 등록 가능합니다.</S.InputDescription>
        <S.InputDescription $warning={true}>*포스터 썸네일은 수정불가합니다.</S.InputDescription>
        <Spacing marginBottom="1.4" />
        <S.FileInputWrapper>
          <S.HiddenFileInput
            key={inputKey}
            type="file"
            id="file"
            accept="images/*"
            onChange={uploadFile}
          />
          <S.CustomFileInput htmlFor="file">
            <IconCamera width={"3.2rem"} />
          </S.CustomFileInput>
          {previewImg && (
            <S.PreviewImageWrapper>
              <S.PreviewImage src={previewImg} alt="Preview" />
              <S.RemoveImageButton onClick={removeImage} />
            </S.PreviewImageWrapper>
          )}
        </S.FileInputWrapper>
      </S.InputRegisterBox>
      {openImageModal && (
        <ImageEditor file={previewImg} aspectRatio={3 / 4} onCropped={handleCroppedImage} />
      )}
    </>
  );
};

export default PosterThumbnail;
