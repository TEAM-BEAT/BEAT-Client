import bookComplete from "@assets/lottie/book-complete.json";
import { IconCheck } from "@assets/svgs";
import Button from "@components/commons/button/Button";
import Spacing from "@components/commons/spacing/Spacing";
import Toast from "@components/commons/toast/Toast";
import useToast from "@hooks/useToast";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import * as S from "./PaidBook.styled";

interface PaidBookProps {
  id: number;
  title: string;
  bankName: string;
  accountNumber: string;
  price: number;
}

const PaidBook = ({ id, title, bankName, accountNumber, price }: PaidBookProps) => {
  const navigate = useNavigate();

  const { showToast, isToastVisible } = useToast();

  const navigateGig = () => {
    navigate(`/gig/${id}`);
  };

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  const handleDepositClick = () => {
    window.open(
      `supertoss://send?bank=${bankName}&accountNo=${accountNumber}&origin=linkgen&amount=${price}`
    );
  };

  return (
    <>
      <S.Wrapper>
        <Lottie
          animationData={bookComplete}
          loop={false}
          play={true}
          style={{ width: "150px", height: "150px", margin: "78px auto 0" }}
        />
        <Spacing marginBottom="3.2" />

        <S.Title>{`${title} \n예매가 완료되었어요!`}</S.Title>
        <Spacing marginBottom="1" />

        <S.Description>어떻게 오셨어요? 비트 타고요.</S.Description>
        <Spacing marginBottom="3.2" />

        <S.DepositContainer>
          <S.DepositBox>
            <S.Text>{bankName}&nbsp;</S.Text>
            <S.Text>{accountNumber}</S.Text>
            <S.CopyIcon onClick={() => handleCopyClipBoard(accountNumber)} />
          </S.DepositBox>
          <S.FlexBox>
            <S.Text>24시간 내로&nbsp;</S.Text>
            <S.PinkText>100,000원</S.PinkText>
            <S.Text>을 입금해주세요.</S.Text>
          </S.FlexBox>
        </S.DepositContainer>

        <S.FloatingWrapper>
          <Button variant="blue" onClick={handleDepositClick}>
            토스로 송금하기
          </Button>
          <S.GigButtonBox onClick={navigateGig}>
            <S.GigText>예매내역 조회하기</S.GigText>
          </S.GigButtonBox>
        </S.FloatingWrapper>
      </S.Wrapper>
      <S.DepositBox>
        <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={52}>
          클립보드에 복사되었습니다!
        </Toast>
      </S.DepositBox>
    </>
  );
};

export default PaidBook;
