import Spacing from "@components/commons/spacing/Spacing";
import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../ModifyManage.styled";
import { IcNoti } from "@assets/svgs";

interface PosterThumbnailProps {
  value?: string | undefined;
  onImageUpload: (imageUrl: string) => void;
}

const PosterThumbnail = ({ value, onImageUpload }: PosterThumbnailProps) => {
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(value || null);

  useEffect(() => {
    setPreviewImg(value || null);
  }, [value]);

  return (
    <S.InputModifyManageBox $marginBottom={2.8}>
      <S.InputTitle>포스터 썸네일</S.InputTitle>
      <Spacing marginBottom="0.8" />
      <S.NotiDiscription>
        <IcNoti width={20} />
        포스터 썸네일은 수정불가합니다.
      </S.NotiDiscription>{" "}
      <Spacing marginBottom="1.4" />
      <S.FileInputWrapper>
        {previewImg && (
          <S.PreviewImageWrapper>
            <S.PreviewImage src={previewImg} alt="Preview" />
          </S.PreviewImageWrapper>
        )}
      </S.FileInputWrapper>
    </S.InputModifyManageBox>
  );
};

export default PosterThumbnail;
