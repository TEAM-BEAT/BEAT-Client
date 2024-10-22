import { IconCamera } from "@assets/svgs";
import TextField from "@components/commons/input/textField/TextField";
import Spacing from "@components/commons/spacing/Spacing";
import { nameFilter } from "@utils/useInputFilter";
import { ChangeEvent, useState } from "react";
import * as S from "../ModifyManage.styled";
import ImageEditor from "@components/commons/imageEditor/ImageEditor";

interface Role {
  makerId: number;
  makerName: string;
  makerRole: string;
  makerPhoto: string;
}

interface RoleWrapperProps {
  id: number;
  role: Role;
  removeRole: (id: number) => void;
  onUpdateRole: (id: number, name: string, value: string) => void;
}

const RoleWrapper = ({ id, role, removeRole, onUpdateRole }: RoleWrapperProps) => {
  console.log("role:", role);
  const { makerName, makerRole, makerPhoto } = role;
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(makerPhoto || null);
  const [openImageModal, setOpenImageModal] = useState(false);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImg(file);

      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setPreviewImg(imageUrl);
        onUpdateRole(id, "makerPhoto", imageUrl);
        setOpenImageModal(true);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateRole(id, name, value);
  };

  // ImageEditor에서 크롭된 이미지 URL을 받아서 상태 업데이트
  const handleCroppedImage = (croppedImageUrl: string) => {
    setPreviewImg(croppedImageUrl); // 프리뷰 이미지 업데이트
    onUpdateRole(id, "makerPhoto", croppedImageUrl); // makerPhoto 업데이트
    setOpenImageModal(false); // 모달 닫기
  };

  //문제 가능성(원인)2 -> 처음 들어올 때는 항상 -1이고, x버튼 눌렀다가 +누르고 추가하면 newDate로 추가됨.
  //그리고 저 presigned url 바뀌는 것도 뭔가 연관성이 있어보이기도.. (곧바로 추가하면 이미지 없어지고, 아니면 이미지 보존)
  return (
    <>
      <S.RoleWrapper>
        <S.FileInputWrapper>
          {previewImg ? (
            <S.PreviewImageWrapper width={13.6} height={13.6}>
              <S.PreviewImage src={previewImg} alt="Preview" width={13.6} height={13.6} />
              <S.RemoveImageButton onClick={() => removeRole(id)} />
            </S.PreviewImageWrapper>
          ) : (
            <>
              <S.HiddenFileInput
                type="file"
                id={`file-${id}`}
                onChange={uploadFile}
                disabled={false}
              />
              <S.CustomFileInput htmlFor={`file-${id}`} width={13.6} height={13.6}>
                <IconCamera width={"3.2rem"} />
                <S.RemoveImageButton onClick={() => removeRole(id)} />
              </S.CustomFileInput>
            </>
          )}
        </S.FileInputWrapper>
        <Spacing marginBottom="1.6" />
        <S.TextInputWrpper>
          <TextField
            type="input"
            name="makerName"
            value={makerName}
            onChange={handleInputChange}
            filter={nameFilter}
            narrow={true}
            placeholder="이름"
            disabled={false}
          />
          <TextField
            type="input"
            name="makerRole"
            value={makerRole}
            onChange={handleInputChange}
            narrow={true}
            placeholder="역할"
            disabled={false}
          />
        </S.TextInputWrpper>
      </S.RoleWrapper>
      {openImageModal && (
        <ImageEditor file={previewImg} aspectRatio={1} onCropped={handleCroppedImage} />
      )}
    </>
  );
};

export default RoleWrapper;
