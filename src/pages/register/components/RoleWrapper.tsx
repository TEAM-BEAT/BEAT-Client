import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import TextField from "@components/commons/input/textField/TextField";
import { IconCamera } from "@assets/svgs";
import { ChangeEvent, useState } from "react";

interface RoleWrapperProps {
  id: number;
  removeRole: (id: number) => void;
  onUpdateRole: (id: number, name: string, value: string) => void;
}

const RoleWrapper = ({ id, removeRole, onUpdateRole }: RoleWrapperProps) => {
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImg(file);

      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setPreviewImg(imageUrl);
        onUpdateRole(id, "makerPhoto", imageUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdateRole(id, name, value);
  };
  return (
    <S.RoleWrapper>
      <S.FileInputWrapper>
        {previewImg ? (
          <S.PreviewImageWrapper width={13.6} height={15.8}>
            <S.PreviewImage src={previewImg} alt="Preview" width={13.6} height={15.8} />
            <S.RemoveImageButton onClick={() => removeRole(id)} />
          </S.PreviewImageWrapper>
        ) : (
          <>
            <S.HiddenFileInput type="file" id={`file-${id}`} onChange={uploadFile} />
            <S.CustomFileInput htmlFor={`file-${id}`} width={13.6} height={15.8}>
              <IconCamera width={"3.2rem"} />
            </S.CustomFileInput>
          </>
        )}
      </S.FileInputWrapper>
      <Spacing marginBottom="1.6" />
      <S.TextInputWrpper>
        <TextField
          type="input"
          name="makerName"
          onChange={handleInputChange}
          narrow={true}
          placeholder="이름"
        />
        <TextField
          type="input"
          name="makerRole"
          onChange={handleInputChange}
          narrow={true}
          placeholder="역할"
        />
      </S.TextInputWrpper>
    </S.RoleWrapper>
  );
};

export default RoleWrapper;
