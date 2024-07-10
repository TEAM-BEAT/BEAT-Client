import Stepper from "@components/commons/stepper/Stepper";
import * as S from "./Count.styled";

interface CountProps {
  round: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
  ticketPrice: number;
}

const Count = ({ round, onMinusClick, onPlusClick, ticketPrice }: CountProps) => {
  return (
    <S.Wrapper>
      <S.Container>
        <div>
          <S.Title>매수 선택</S.Title>
          <S.Comment>현재 잔여 티켓이 5매 이하입니다.</S.Comment>
        </div>
        <Stepper max={3} round={round} onMinusClick={onMinusClick} onPlusClick={onPlusClick} />
      </S.Container>
      <div>
        <S.PricePrefix>총</S.PricePrefix>
        <S.TotalPrice>{(round * ticketPrice).toLocaleString()}원</S.TotalPrice>
      </div>
    </S.Wrapper>
  );
};

export default Count;
