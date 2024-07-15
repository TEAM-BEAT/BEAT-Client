import { ReactNode } from "react";
import * as S from "./Label.styled";

interface LabelProps {
  type: "count" | "finish" | "today";
  children: ReactNode;
}

const Labal = ({ type, children }: LabelProps) => {
  return (
    <S.LabelWrapper>
      {type === "count" ? (
        <>
          <S.CountLabel />
          <S.CountDueDate>{children}</S.CountDueDate>
        </>
      ) : type === "finish" ? (
        <>
          <S.FinishLabel />
          <S.FinishDueDate>{children}</S.FinishDueDate>
        </>
      ) : (
        <>
          <S.TodayLabel />
          <S.CountDueDate>{children}</S.CountDueDate>
        </>
      )}
    </S.LabelWrapper>
  );
};

export default Labal;
