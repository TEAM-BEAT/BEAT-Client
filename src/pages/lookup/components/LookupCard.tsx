import * as S from "./LookupCard.styled";

const LookupCard = () => {
  return (
    <S.LookupCardWrapper>
      <S.LookupTitle>Title</S.LookupTitle>
      <S.BoxDivider />
      <S.ContextLayout>
        <S.Context>
          <S.SubTitle>제목</S.SubTitle>
          <S.Text>내용</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>제목</S.SubTitle>
          <S.Text>내용</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>제목</S.SubTitle>
          <S.Text>내용</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>제목</S.SubTitle>
          <S.Text>내용</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>제목</S.SubTitle>
          <S.Text>내용</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>제목</S.SubTitle>
          <S.Text>내용</S.Text>
        </S.Context>
      </S.ContextLayout>
    </S.LookupCardWrapper>
  );
};

export default LookupCard;
