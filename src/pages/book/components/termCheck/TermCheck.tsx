import * as S from "./TermCheck.styled";

interface TermCheckProps {
  isTermChecked: boolean;
  onClickTermCheck: () => void;
}

const TermCheck = ({ isTermChecked, onClickTermCheck }: TermCheckProps) => {
  return (
    <S.Wrapper>
      <div>
        {/* TODO: 약관 페이지로 변경 */}
        <S.HyperLinkText href="http://www.naver.com">이용약관</S.HyperLinkText>
        <S.HyperLinkSpan>에 동의합니다</S.HyperLinkSpan>
      </div>
      <S.StyledCheckbox type="checkbox" checked={isTermChecked} onChange={onClickTermCheck} />
    </S.Wrapper>
  );
};

export default TermCheck;
