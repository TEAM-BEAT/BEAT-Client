import { IconCamera } from "@assets/svgs";
import Spacing from "@components/commons/spacing/Spacing";
import { ChangeEvent, useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import * as S from "../ModifyManage.styled";

interface DetailImageProps {
  value?: PreviewImageList[] | undefined;
  onImagesUpload: (detailImage: PreviewImageList[]) => void;
}

interface PreviewImageList {
  performanceImageId?: number;
  performanceImage: string;
}

const ModifyDetailImage = ({ value, onImagesUpload }: DetailImageProps) => {
  const { openAlert } = useModal();
  const [previewImgs, setPreviewImgs] = useState<PreviewImageList[] | null>(value || null);
  const [inputKey, setInputKey] = useState<number>(Date.now());

  useEffect(() => {
    setPreviewImgs(value || null);
  }, [value]);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 최대 5장 업로드 안내
      if (previewImgs.length + files.length > 5) {
        openAlert({
          title: "가능한 이미지 수를 초과했습니다.",
          okText: "확인",
        });
        return;
      }

      // 파일 순서대로 처리하기 위해 비동기 작업
      const processFile = (file: File) => {
        return new Promise<PreviewImageList>((resolve) => {
          const fileReader = new FileReader();
          fileReader.onload = function (event) {
            const imageUrl = event.target?.result as string;
            resolve({
              performanceImageId: Date.now() + Math.floor(Math.random() * 1000), // ctrl 키로 동시에 이미지 선택해도 id 중복되지 않도록 랜덤 값 추가
              performanceImage: imageUrl,
            });
          };
          fileReader.readAsDataURL(file);
        });
      };

      // 모든 파일 처리 완료 후 상태 업데이트
      const processAllFiles = async () => {
        const newPreviewImgs = await Promise.all(
          Array.from(files).map((file) => processFile(file))
        );
        const updatedPreviewImgs = [...previewImgs, ...newPreviewImgs];
        onImagesUpload(updatedPreviewImgs);
      };

      processAllFiles();
    }
  };

  const removeImage = (id: number) => {
    onImagesUpload(previewImgs.filter((detail) => detail.performanceImageId !== id)); // 비동기적으로 반영되는 setState때문에 내부에 넣어야 필터링된 최신 이미지들을 바로 반영됨

    setInputKey(Date.now());
  };

  return (
    <S.InputModifyManageBox $marginBottom={2.8}>
      <S.InputTitle>공연 상세 이미지</S.InputTitle>
      <S.InputDescription>선택 사항입니다. (최대 5장)</S.InputDescription>
      <Spacing marginBottom="1.4" />
      <S.FilesInputWrapper>
        <S.HiddenFileInput
          key={inputKey}
          type="file"
          id="files"
          accept="image/png, image/jpg, image/jpeg, image/svg"
          onChange={uploadFile}
          multiple
          disabled={previewImgs.length >= 5}
        />
        <S.CustomFileInput htmlFor="files" width={15.7} height={21}>
          <IconCamera width={"3.2rem"} />
          <S.CustomFileInputCounter>
            <S.CustomFileInputLength>{previewImgs.length}</S.CustomFileInputLength>/5
          </S.CustomFileInputCounter>
        </S.CustomFileInput>
        {previewImgs &&
          previewImgs.map((previewImg) => (
            <S.PreviewImageWrapper key={previewImg.performanceImageId} width={15.7} height={21}>
              <S.PreviewImage
                src={previewImg.performanceImage}
                alt={`Preview-${previewImg.performanceImageId}`}
                width={15.7}
                height={21}
              />
              <S.RemoveImageButton onClick={() => removeImage(previewImg.performanceImageId)} />
            </S.PreviewImageWrapper>
          ))}
      </S.FilesInputWrapper>
    </S.InputModifyManageBox>
  );
};

export default ModifyDetailImage;
