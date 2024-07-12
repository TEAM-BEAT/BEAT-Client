import Button from "@components/commons/button/Button";
import RoleLayout from "./components/RoleLayout";
import * as S from "./Register.styled";

const RegisterMaker = () => {
  return (
    <>
      <S.RegisterContainer>
        <RoleLayout title="출연진" />
        <S.Divider />
        <RoleLayout title="스태프" />
      </S.RegisterContainer>
      <S.FooterContainer>
        <S.FooterDivider />
        <S.FooterInfo>공연진 상세정보는 선택사항 입니다.</S.FooterInfo>
        <Button onClick={() => console.log("예매하기 클릭")}>다음</Button>
      </S.FooterContainer>
    </>
  );
};

export default RegisterMaker;
