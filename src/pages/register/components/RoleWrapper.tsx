import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import TextField from "@components/commons/input/textField/TextField";
import { IconCamera } from "@assets/svgs";
import { ChangeEvent, useState } from "react";

const RoleWrapper = () => {
  const [postImg, setPostImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPostImg(file);

      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const imageUrl = event.target?.result as string;
        setPreviewImg(imageUrl);
        onImageUpload(imageUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }

  const removeImage = () => {
    setPostImg(null);
    setPreviewImg(null);
  };

  return (
    <>
      <S.FileInputWrapper>
        {previewImg ? (
          <S.PreviewImageWrapper width={13.6} height={15.8}>
            <S.PreviewImage src={previewImg} alt="Preview" width={13.6} height={15.8} />
            <S.RemoveImageButton onClick={removeImage} />
          </S.PreviewImageWrapper>
        ) : (
          <>
            <S.HiddenFileInput type="file" id="file" onChange={uploadFile} />
            <S.CustomFileInput htmlFor="file" width={13.6} height={15.8}>
              <IconCamera width={"3.2rem"} />
            </S.CustomFileInput>
          </>
        )}
      </S.FileInputWrapper>
      <Spacing marginBottom="1.6" />
      <S.TextInputWrpper>
        <TextField
          type="input"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          narrow={true}
          placeholder="이름"
        />
        <TextField
          type="input"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          narrow={true}
          placeholder="역할"
        />
      </S.TextInputWrpper>
    </>
  );
};

export default RoleWrapper;
