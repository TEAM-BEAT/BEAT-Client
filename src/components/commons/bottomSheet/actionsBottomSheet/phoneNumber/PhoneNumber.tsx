import * as S from "./PhoneNumber.styled";

interface PhoneNumProps {
  phone?: string;
}

const PhoneNumber = ({ phone }: PhoneNumProps) => {
  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    // 현재 토스트 메시지가 없어 간단한 alert로 대체. 후에 수정 필요
    alert(`${text} 클립보드에 복사.`);
  };

  return (
    <S.PhoneNumWrapper>
      <S.PhoneNumLayout type="button" onClick={() => handleCopyClipBoard(phone || "")}>
        <S.PhoneNum>{phone}</S.PhoneNum>
        <S.Copy />
      </S.PhoneNumLayout>
    </S.PhoneNumWrapper>
  );
};

export default PhoneNumber;
