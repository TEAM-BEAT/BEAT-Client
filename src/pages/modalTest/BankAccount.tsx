import { IcomCopy, IconCheck } from "@assets/svgs";
import Button from "@components/commons/button/Button";
import Toast from "@components/commons/toast/Toast";
import useModal from "@hooks/useModal";
import useToast from "@hooks/useToast";
import styled from "styled-components";

interface BankNumberProps {
  bankName: string;
  number: string;
}

const BankAccount = ({ bankName, number }: BankNumberProps) => {
  const { showToast, isToastVisible } = useToast();

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  const { closeModal } = useModal();
  return (
    <Wrapper>
      <Container>
        <Text>{bankName}</Text>
        <Box>
          <Text>{number}</Text>
          <StyledIconCopy onClick={() => handleCopyClipBoard(number)} />
        </Box>
      </Container>
      <Button size="large" variant="gray" onClick={closeModal}>
        닫기
      </Button>
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
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

const Text = styled.p`
  text-align: center;
  ${({ theme }) => theme.fonts.heading4};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIconCopy = styled(IcomCopy)`
  box-sizing: content-box;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;
`;
