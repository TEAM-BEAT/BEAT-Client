import * as S from "./ModalWrapper.styled";

interface ModalTextBoxProps {
  title: string;
  subTitle?: string;
}

const ModalTextBox = ({ title, subTitle }: ModalTextBoxProps) => {
  return (
    <S.ModalTextWrapper>
      <S.ModalTitle>{title}</S.ModalTitle>
      {subTitle && <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>}
    </S.ModalTextWrapper>
  );
};

export default ModalTextBox;
