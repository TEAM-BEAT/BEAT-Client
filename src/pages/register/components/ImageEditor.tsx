import React, { useState, useRef } from "react";
import * as S from "../ImageEditor.styled";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@components/commons/button/Button";

interface ImageEditorProps {
  file: string;
  onCropped: (croppedImageUrl: string) => void; // 크롭된 이미지 URL을 전달할 콜백 함수
}

const ImageEditor = ({ file, onCropped }: ImageEditorProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 이미지의 원래 너비와 높이 가져오기
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    // 이미지의 중앙에 크롭 영역 설정
    const centerCropped = centerCrop(
      makeAspectCrop(
        // 크롭 영역 설정
        {
          unit: "%", // 크롭 단위
          width: 100, // 크롭 영역 너비
        },
        3 / 4, // 가로/세로
        width,
        height
      ),
      width,
      height
    );

    setCrop(centerCropped); // 중앙에 설정된 크롭 영역을 상태에 반영
  };

  // 이미지 크롭 업데이트
  const onCropChange = (crop: Crop, percentCrop: Crop) => {
    setCrop(percentCrop);
  };

  const onCropComplete = (crop: PixelCrop, percentCrop: Crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop: PixelCrop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imageRef.current, crop, "newFile.jpeg");
      setCroppedImageUrl(croppedImage);
    }
  };

  // 크롭된 이미지를 생성
  const getCroppedImg = (
    image: HTMLImageElement,
    crop: PixelCrop,
    fileName: string
  ): Promise<string> => {
    // 캔버스에 이미지 생성
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    // 캔버스 크기를 원본 해상도 기준으로 설정
    const pixelRatio = window.devicePixelRatio; // 실제 픽셀 크기와 CSS 픽셀 크기 간의 비율
    canvas.width = crop.width * scaleX * pixelRatio;
    canvas.height = crop.height * scaleY * pixelRatio;
    const ctx = canvas.getContext("2d");

    // 고해상도 이미지를 유지하기 위해 canvas에 스케일 적용
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      // 원본 이미지 영역
      image,
      crop.x * scaleX, // 크롭 시작 x 좌표
      crop.y * scaleY, // 크롭 시작 y 좌표
      crop.width * scaleX, // 크롭할 이미지의 가로 길이
      crop.height * scaleY, // 크롭할 이미지의 세로 길이
      // 캔버스 영역
      0, // 캔버스에서 이미지 시작 x 좌표
      0, // 캔버스에서 이미지 시작 y 좌표
      crop.width * scaleX, // 캔버스에서 이미지의 가로 길이
      crop.height * scaleY //  캔버스에서 이미지의 세로 길이
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("이미지 없음");
          return reject(new Error("이미지 없음"));
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const handleComplete = () => {
    if (croppedImageUrl) {
      onCropped(croppedImageUrl); // 크롭된 이미지 URL을 부모 컴포넌트로 전달
    }
  };

  return (
    <S.ModalContainer>
      <ReactCrop
        crop={crop}
        onChange={onCropChange}
        onComplete={onCropComplete}
        aspect={3 / 4} // Aspect ratio of the crop area
        ruleOfThirds={true} // 삼분법선
      >
        <S.OriginImage src={file} alt="Original" onLoad={onImageLoad} ref={imageRef} />
      </ReactCrop>
      <Button onClick={handleComplete}>완료하기</Button>
    </S.ModalContainer>
  );
};

export default ImageEditor;
