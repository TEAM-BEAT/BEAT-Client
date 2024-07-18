import React from "react";
import * as S from "./TermCheck.styled";

interface TermCheckProps {
  isNonMember: boolean;
  isTermChecked: { term1: boolean; term2: boolean };
  onClickTermCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TermCheck = ({ isNonMember, isTermChecked, onClickTermCheck }: TermCheckProps) => {
  return (
    <S.Wrapper>
      <S.Box>
        {isNonMember && (
          <>
            <div>
              <S.HyperLinkText href="https://jiwoothejay.notion.site/968da08432694908954daccbadc9906a">
                비회원 이용약관
              </S.HyperLinkText>
              <S.HyperLinkSpan> 에 동의합니다.</S.HyperLinkSpan>
            </div>
            <S.StyledCheckbox
              type="checkbox"
              name="term1"
              checked={isTermChecked.term1}
              onChange={onClickTermCheck}
            />
          </>
        )}
      </S.Box>
      <S.Box>
        <div>
          {isNonMember && <S.HyperLinkSpan>웹 발신을 위한 </S.HyperLinkSpan>}
          <S.HyperLinkText href="https://jiwoothejay.notion.site/2e52f4f9f5a14ef3a53e3457ca5066df">
            개인정보 처리방침
          </S.HyperLinkText>
          <S.HyperLinkSpan> 에 동의합니다.</S.HyperLinkSpan>
        </div>
        <S.StyledCheckbox
          type="checkbox"
          name="term2"
          checked={isTermChecked.term2}
          onChange={onClickTermCheck}
        />
      </S.Box>
    </S.Wrapper>
  );
};

export default TermCheck;
