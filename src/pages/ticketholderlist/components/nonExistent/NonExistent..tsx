import React from "react";
import * as S from "./NonExistent.styled";

interface NonExistentProps {
  status: string;
}

const NonExistent = ({ status }: NonExistentProps) => {
  return (
    <S.NonExistentWrapper>
      <S.NonExistenLayout>
        <S.EmptyImg />
        <S.EmptyText>
          {status === "PAYMENT"
            ? "미입금한 예매자가 없어요."
            : status === "REFUND"
              ? "환불 요청이 없어요."
              : "아직 예매자가 없어요."}
        </S.EmptyText>
      </S.NonExistenLayout>
    </S.NonExistentWrapper>
  );
};

export default NonExistent;
