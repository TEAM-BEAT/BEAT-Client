import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import TextField from "@components/commons/input/textField/TextField";
import { IconCamera } from "@assets/svgs";
import { ChangeEvent, useState } from "react";
import { nameFilter } from "@utils/useInputFilter";

interface Role {
  id: number;
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
  const { makerName, makerRole, makerPhoto } = role;
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(makerPhoto || null);

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
          <S.PreviewImageWrapper width={13.6} height={13.6}>
            <S.PreviewImage src={previewImg} alt="Preview" width={13.6} height={13.6} />
            <S.RemoveImageButton onClick={() => removeRole(id)} />
          </S.PreviewImageWrapper>
        ) : (
          <>
            <S.HiddenFileInput type="file" id={`file-${id}`} onChange={uploadFile} />
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
        />
        <TextField
          type="input"
          name="makerRole"
          value={makerRole}
          onChange={handleInputChange}
          narrow={true}
          placeholder="역할"
        />
      </S.TextInputWrpper>
    </S.RoleWrapper>
  );
};

export default RoleWrapper;
