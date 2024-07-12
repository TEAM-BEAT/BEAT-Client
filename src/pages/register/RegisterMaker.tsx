import RoleLayout from "./components/RoleLayout";
import * as S from "./Register.styled";

const RegisterMaker = () => {
  return (
    <S.RegisterContainer>
      <RoleLayout title="출연진" />
      <S.Divider />
      <RoleLayout title="스태프" />
    </S.RegisterContainer>
  );
};

export default RegisterMaker;
