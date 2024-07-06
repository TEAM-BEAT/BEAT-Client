import * as S from "./ContextStyle";

export interface contextPropsTypes {
  subTitle: string;
  text: string;
}

const Context = ({ subTitle, text }: contextPropsTypes) => {
  return (
    <S.ContextWrapper>
      <S.SubTitle>{subTitle}</S.SubTitle>
      <S.Text>{text}</S.Text>
    </S.ContextWrapper>
  );
};

export default Context;
