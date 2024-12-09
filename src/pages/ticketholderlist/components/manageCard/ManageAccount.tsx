import * as S from "./ManageAccount.styled";

interface ManageAccountProps {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  handleCopyClipBoard: (number) => void;
}

export default function ManageAccount({
  bankName,
  accountNumber,
  accountHolder,
  handleCopyClipBoard,
}: ManageAccountProps) {
  return (
    <>
      <S.ManageAccountWrapper onClick={() => handleCopyClipBoard(accountNumber)}>
        {bankName} ({accountHolder}) {accountNumber}
        <S.CopyIcon />
      </S.ManageAccountWrapper>
    </>
  );
}
