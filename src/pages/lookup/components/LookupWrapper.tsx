import * as S from "./LookupWrapper.styled";

import Button from "@components/commons/button/Button";
import LookupCard from "./LookupCard";
import { calculateDueDate } from "@utils/calculateDueDate";
import Labal from "@components/commons/label/Labal";

import { LookupProps } from "../types/lookupType";

const LookupWrapper = ({ handleBtn, ...item }: LookupProps) => {
  const dueDateText = calculateDueDate(item.dueDate);

  return (
    <S.LookupLayout>
      <S.LookupContainer>
        <S.LookupCardLeft>
          <S.TempImage />
          {item.dueDate >= 1 ? (
            <>
              <Labal type="count"> {dueDateText}</Labal>
            </>
          ) : item.dueDate === 0 ? (
            <>
              <Labal type="today"> {dueDateText}</Labal>
            </>
          ) : (
            <>
              <Labal type="finish"> {dueDateText}</Labal>
            </>
          )}

          <Button variant="line" size="xsmall" onClick={handleBtn}>
            취소하기
          </Button>
        </S.LookupCardLeft>
        <LookupCard {...item}></LookupCard>
      </S.LookupContainer>
    </S.LookupLayout>
  );
};

export default LookupWrapper;
