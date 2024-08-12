import * as S from "./Label.styled";

interface LabelProps {
  dueDate: number;
}

const Label = ({ dueDate }: LabelProps) => {
  return (
    <S.LabelWrapper>
      {dueDate === 0 && (
        <>
          <S.TodayLabel />
          <S.CountDueDate>D-DAY</S.CountDueDate>
        </>
      )}
      {dueDate < 0 && (
        <>
          <S.FinishLabel />
          <S.FinishDueDate>공연종료</S.FinishDueDate>
        </>
      )}
      {dueDate > 0 &&
        (dueDate <= 5 ? (
          <>
            <S.CountLabel />
            <S.CountDueDate>D-{dueDate}</S.CountDueDate>
          </>
        ) : null)}
    </S.LabelWrapper>
  );
};

export default Label;
