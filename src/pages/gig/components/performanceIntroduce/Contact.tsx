import { IconArrowDown, IconArrowUp, IconCheck } from "@assets/svgs";
import Toast from "@components/commons/toast/Toast";
import useToast from "@hooks/useToast";
import { useState } from "react";
import * as S from "./PerformanceIntroduce.styled";

interface ContactProps {
  contact: string;
}

const Contact = ({ contact }: ContactProps) => {
  const { showToast, isToastVisible } = useToast();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleCopyClipBoard = async (text: string) => {
    await navigator.clipboard.writeText(text);

    showToast();
  };

  return (
    <S.ContactContainer>
      <S.ContactTitleBox>
        <S.Title>문의 연락처</S.Title>
        <S.Toggle onClick={handleToggle}>{toggle ? <IconArrowUp /> : <IconArrowDown />}</S.Toggle>
      </S.ContactTitleBox>
      {toggle && <S.Contact onClick={() => handleCopyClipBoard(contact)}>{contact}</S.Contact>}
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={100}>
        클립보드에 복사되었습니다!
      </Toast>
    </S.ContactContainer>
  );
};

export default Contact;
