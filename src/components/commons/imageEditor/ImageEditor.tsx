import React, { useState, useRef, useEffect } from "react";
import * as S from "./ImageEditor.styled";
import { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@components/commons/button/Button";

interface ImageEditorProps {
  file: string;
  aspectRatio: number;
  onCropped: (croppedImageUrl: string) => void;
}

const ImageEditor = ({ file, aspectRatio, onCropped }: ImageEditorProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [calculatedSize, setCalculatedSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 이미지의 원래 너비와 높이 가져오기
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    if (e.currentTarget) {
      setImageSize({ width, height });
    }

    // 이미지의 중앙에 크롭 영역 설정
    const centerCropped = centerCrop(
      makeAspectCrop(
        // 크롭 영역 설정
        {
          unit: "%", // 크롭 단위
          width: 100, // 크롭 영역 너비
          height: 100,
        },
        width / height,
        width,
        height
      ),
      width,
      height
    );

    setCrop(centerCropped); // 중앙에 설정된 크롭 영역을 상태에 반영
  };

  useEffect(() => {
    if (imageSize.width > 0 && imageSize.height > 0) {
      // 렌더링된 이미지 크기 계산
      const renderedWidth = 32;
      const renderedHeight = (imageSize.height / imageSize.width) * renderedWidth;

      // 100으로 초기화했던 크롭 영역의 최대 크기 계산
      const maxWidth = (crop.width / 100) * renderedWidth;
      const maxHeight = (crop.height / 100) * renderedHeight;

      // 최적의 width, height 계산
      let width, height;
      if (maxWidth / aspectRatio > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      } else {
        width = maxWidth;
        height = width / aspectRatio;
      }

      setCalculatedSize({ width, height });
    }
  }, [imageSize, crop]);

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
    } else {
      onCropped(file); // 크롭하지 않으면 원래 URL 전달
    }
  };

  return (
    <S.ModalContainer>
      <S.CustomReactCrop
        crop={crop}
        onChange={onCropChange}
        onComplete={onCropComplete}
        ruleOfThirds={true} // 삼분법선
        calculatedSize={calculatedSize}
      >
        <S.OriginImage src={file} alt="Original" onLoad={onImageLoad} ref={imageRef} />
      </S.CustomReactCrop>
      <Button onClick={handleComplete}>완료하기</Button>
    </S.ModalContainer>
  );
};

export default ImageEditor;
