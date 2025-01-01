import * as S from "./ManageAccount.styled";

interface ManageAccountProps {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  handleCopyClipBoard: (text: string) => void;
}

export default function ManageAccount({
  bankName,
  accountNumber,
  accountHolder,
  handleCopyClipBoard,
}: ManageAccountProps) {
  return (
    <>
      <S.ManageAccountWrapper onClick={() => handleCopyClipBoard(`${bankName} ${accountNumber}`)}>
        {bankName} ({accountHolder}) {accountNumber}
        <S.CopyIcon />
      </S.ManageAccountWrapper>
    </>
  );
}
