import * as S from "./Context.styled";

interface contextProps {
  subTitle: string;
  text?: string;
  isDate?: boolean;
  date?: string;
  time?: string;
}

const Context = ({ subTitle, text, isDate, date, time }: contextProps) => {
  return (
    <S.ContextWrapper>
      {isDate ? (
        <S.ContextLayout>
          <S.SubTitle>{subTitle}</S.SubTitle>
          <S.Text>{date}</S.Text>
          <S.DateBar />
          <S.Text>{time}</S.Text>
        </S.ContextLayout>
      ) : (
        <S.ContextLayout>
          <S.SubTitle>{subTitle}</S.SubTitle>
          <S.Text>{text}</S.Text>
        </S.ContextLayout>
      )}
    </S.ContextWrapper>
  );
};

export default Context;
