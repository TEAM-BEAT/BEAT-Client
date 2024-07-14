import * as S from "./Footer.styled";

const Footer = () => {
  const privacy = "https://jiwoothejay.notion.site/2e52f4f9f5a14ef3a53e3457ca5066df?pvs=4";
  const service = "https://jiwoothejay.notion.site/032adc725a3d4ec9b5f22e437c48ab4e?pvs=4";

  return (
    <S.FooterWrapper>
      <S.FooterTop>
        <S.Logo />
        <S.InfoLayout>
          <S.InfoBtn
            onClick={() => {
              window.open(privacy, "개인정보처리방침", "noopener");
            }}
          >
            개인정보처리방침
          </S.InfoBtn>
          <S.BtnDivider />
          <S.InfoBtn
            onClick={() => {
              window.open(service, "이용약관", "noopener");
            }}
          >
            이용약관
          </S.InfoBtn>
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
