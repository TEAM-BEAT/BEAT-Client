import * as S from "./ManageAccount.styled";

interface ManageAccountProps {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export default function ManageAccount({
  bankName,
  accountNumber,
  accountHolder,
}: ManageAccountProps) {
  return (
    // TODO : 클릭 시 계좌번호 복사 기능 추가
    <S.ManageAccountWrapper>
      {bankName} ({accountHolder}) {accountNumber}
      <S.CopyIcon />
    </S.ManageAccountWrapper>
  );
}
