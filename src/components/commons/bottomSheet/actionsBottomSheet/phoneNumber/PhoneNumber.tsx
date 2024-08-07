import { IconCheck } from "@assets/svgs";
import * as S from "./PhoneNumber.styled";

import Toast from "@components/commons/toast/Toast";
import { useToast } from "@hooks";

interface PhoneNumProps {
  phone?: string;
}

const PhoneNumber = ({ phone }: PhoneNumProps) => {
  const { showToast, isToastVisible } = useToast();

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  return (
    <>
      <S.PhoneNumWrapper>
        <S.PhoneNumLayout type="button" onClick={() => handleCopyClipBoard(phone || "")}>
          <S.PhoneNum>{phone}</S.PhoneNum>
          <S.Copy />
        </S.PhoneNumLayout>
      </S.PhoneNumWrapper>
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
        클립보드에 복사되었습니다!
      </Toast>
    </>
  );
};

export default PhoneNumber;
