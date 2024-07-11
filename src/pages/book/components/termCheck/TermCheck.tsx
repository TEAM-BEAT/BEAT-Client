import * as S from "./TermCheck.styled";

const TermCheck = () => {
  return (
    <S.Wrapper>
      <div>
        {/* TODO: 약관 페이지로 변경 */}
        <S.HyperLinkText href="http://www.naver.com">이용약관</S.HyperLinkText>
        <S.HyperLinkSpan>에 동의합니다</S.HyperLinkSpan>
      </div>
      <S.StyledCheckbox type="checkbox" />
    </S.Wrapper>
  );
};

export default TermCheck;
