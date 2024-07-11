import * as S from "./Footer.styled";

const Footer = () => {
  return (
    <S.FooterWrapper>
      <S.FooterTop>
        <S.Logo />
        <S.InfoLayout>
          {/* 이용 약관 page 들어오면 navigate 걸기 */}
          <S.InfoBtn>개인정보처리방침</S.InfoBtn>
          <S.BtnDivider />
          <S.InfoBtn>이용약관</S.InfoBtn>
        </S.InfoLayout>
      </S.FooterTop>
      <S.FooterBottom>
        <S.FooterInfo>대표 : 서지우</S.FooterInfo>
        <S.FooterInfo>이메일 : beatlebeatle.official@gmail.com</S.FooterInfo>
        <S.FooterInfo>전화번호 : 070-8058-8213</S.FooterInfo>
        <S.FooterInfo>Copyright 2024. Beat For Gig. All rights reserved.</S.FooterInfo>
      </S.FooterBottom>
    </S.FooterWrapper>
  );
};

export default Footer;
