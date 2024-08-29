import * as S from "./LookupWrapper.styled";

import Button from "@components/commons/button/Button";
import Label from "@components/commons/label/Label";
import LookupCard from "./LookupCard";

import { LookupProps } from "../types/lookupType";

const LookupWrapper = ({ handleBtn, ...item }: LookupProps) => {
  return (
    <S.LookupLayout>
      <S.LookupContainer>
        <S.LookupCardLeft>
          <S.LookupImage src={item.posterImage} />
          <Label dueDate={item.dueDate} />
          {item.dueDate < 0 || item.bookingStatus === "BOOKING_CANCELLED" ? (
            <Button variant="line" disabled={true} size={{ width: "10.8rem", height: "3.6rem" }}>
              취소하기
            </Button>
          ) : (
            <Button
              variant="line"
              size={{ width: "10.8rem", height: "3.6rem" }}
              onClick={handleBtn}
            >
              취소하기
            </Button>
          )}
        </S.LookupCardLeft>
        <LookupCard {...item}></LookupCard>
      </S.LookupContainer>
    </S.LookupLayout>
  );
};

export default LookupWrapper;
