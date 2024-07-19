import bookComplete from "@assets/lottie/book.json";
import Spacing from "@components/commons/spacing/Spacing";
import Lottie from "react-lottie-player";
import * as S from "./FreeBook.styled";

interface FreeBookProps {
  id: number;
  title: string;
  handleLookup: () => void;
}

const FreeBook = ({ id, title, handleLookup }: FreeBookProps) => {
  return (
    <S.Wrapper>
      <Lottie
        animationData={bookComplete}
        loop={false}
        play={true}
        style={{ width: "150px", height: "150px", margin: "80px auto 0" }}
      />
      <Spacing marginBottom="2.6" />

      <S.Title>{`${title} \n예매가 완료되었어요!`}</S.Title>
      <Spacing marginBottom="1" />

      <S.Description>어떻게 오셨어요? 비트 타고요.</S.Description>

      <S.FloatingWrapper>
        <S.GigButtonBox onClick={handleLookup}>
          <S.GigText>예매내역 조회하기</S.GigText>
        </S.GigButtonBox>
      </S.FloatingWrapper>
    </S.Wrapper>
  );
};

export default FreeBook;
