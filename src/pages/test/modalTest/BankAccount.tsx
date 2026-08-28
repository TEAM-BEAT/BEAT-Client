import { IcomCopy, IconCheck } from "@assets/svgs";
import Button from "@components/commons/button/Button";
import Toast from "@components/commons/toast/Toast";
import { useModal, useToast } from "@hooks";
import { getBankNameKr } from "@utils/getBankName";
import styled from "styled-components";

interface BankNumberProps {
  bankName: string;
  number: string;
  accountName: string;
  accountNumber: string;
  price: number;
}

const BankAccount = ({ bankName, number, accountName, accountNumber, price }: BankNumberProps) => {
  const { showToast, isToastVisible } = useToast();

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  const handleDepositClick = () => {
    window.open(
      `supertoss://send?bank=${getBankNameKr(bankName)}&accountNo=${accountNumber}&origin=linkgen&amount=${price}`
    );
  };

  const { closeModal } = useModal();
  return (
    <Wrapper>
      <Container>
        <Text>
          {bankName} ({accountName})
        </Text>
        <Box>
          <Text>{number}</Text>
          <StyledIconCopy onClick={() => handleCopyClipBoard(number)} />
        </Box>
      </Container>
      <PaymentNotice>
        입금 전이라면 안내된 계좌로 입금해 주세요. 이미 입금했다면 관리자 확인을 기다려 주세요.
      </PaymentNotice>
      <BtnWrapper>
        <Button size="small" variant="gray" onClick={closeModal}>
          닫기
        </Button>
        <Button size="small" variant="blue" onClick={handleDepositClick}>
          토스로 송금
        </Button>
      </BtnWrapper>

      <Toast icon={<IconCheck />} isVisible={isToastVisible} isTop={true}>
        클립보드에 복사되었습니다!
      </Toast>
    </Wrapper>
  );
};

export default BankAccount;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
`;

const Container = styled.div`
  width: 100%;
`;

const PaymentNotice = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  text-align: center;
  ${({ theme }) => theme.fonts["caption2-medi"]};
`;

const Text = styled.p`
  text-align: center;
  ${({ theme }) => theme.fonts.heading4};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnWrapper = styled.section`
  display: flex;
  gap: 0.7rem;
`;

const StyledIconCopy = styled(IcomCopy)`
  box-sizing: content-box;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;
`;
