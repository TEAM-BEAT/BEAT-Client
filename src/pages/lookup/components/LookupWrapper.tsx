import * as S from "./LookupWrapper.styled";

import Button from "@components/commons/button/Button";
import LookupCard from "./LookupCard";

const LookupWrapper = ({ ...item }) => {
  return (
    <S.LookupLayout>
      <S.LookupContainer>
        <S.LookupCardLeft>
          <S.TempImage />
          <Button variant="line" size="xsmall">
            취소하기
          </Button>
        </S.LookupCardLeft>
        <LookupCard {...item}></LookupCard>
      </S.LookupContainer>
    </S.LookupLayout>
  );
};

export default LookupWrapper;
