import * as S from "./LookupWrapper.styled";

import Button from "@components/commons/button/Button";
import LookupCard from "./LookupCard";

import { LookupProps } from "../types/lookupType";

const LookupWrapper = ({ handleBtn, ...item }: LookupProps) => {
  return (
    <S.LookupLayout>
      <S.LookupContainer>
        <S.LookupCardLeft>
          <S.TempImage />
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
