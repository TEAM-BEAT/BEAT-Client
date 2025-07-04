import bookComplete from "@assets/lottie/book-complete.json";
import { IconCheck } from "@assets/svgs";
import Button from "@components/commons/button/Button";
import Spacing from "@components/commons/spacing/Spacing";
import Toast from "@components/commons/toast/Toast";
import { useModal, useToast } from "@hooks";
import { getBankNameKr } from "@utils/getBankName";
import { getDeviceType } from "@utils/getDeviceType";
import Lottie from "react-lottie-player";
import * as S from "./PaidBook.styled";
import PromotionImg from "../../../../assets/images/promotion.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface PaidBookProps {
  id: number;
  title: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  totalPaymentAmount: number;
  handleLookup: () => void;
}

const PaidBook = ({
  id,
  title,
  accountHolder,
  bankName,
  accountNumber,
  totalPaymentAmount,
  handleLookup,
}: PaidBookProps) => {
  const { showToast, isToastVisible } = useToast();
  const { openAlert } = useModal();
  const deviceType = getDeviceType();

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

  const handleDepositClick = () => {
    if (deviceType === "Android" || deviceType === "iOS") {
      window.open(
        `supertoss://send?bank=${getBankNameKr(bankName)}&accountNo=${accountNumber}&origin=linkgen&amount=${totalPaymentAmount}`
      );
    } else {
      openAlert({
        title: "모바일 기기에서 결제를 진행해주세요.",
      });
    }
  };

  const [space, setSpace] = useState("");

  useEffect(() => {
    const screenHeight = window.innerHeight;
    if (screenHeight < 812) {
      setSpace("10.8");
    } else {
      setSpace("0");
    }
  }, []);

  return (
    <>
      <S.Wrapper>
        <Lottie
          animationData={bookComplete}
          loop={false}
          play={true}
          style={{ width: "150px", height: "150px", margin: "40px auto 0" }}
        />
        {/* <Spacing marginBottom="3.2" /> */}

        <S.Title>{`${title} \n예매가 완료되었어요!`}</S.Title>
        <Spacing marginBottom="1" />

        <S.Description>입금자명은 예약자 이름과 동일하게 설정해주세요.</S.Description>
        <Spacing marginBottom="2.6" />

        <S.DepositContainer>
          <S.DepositBox>
            <S.Text>{getBankNameKr(bankName)}&nbsp;</S.Text>
            <S.Text>({accountHolder})&nbsp;</S.Text>
            <S.PinkText>{totalPaymentAmount.toLocaleString()}원</S.PinkText>
          </S.DepositBox>
          <S.FlexBox>
            <S.Text>{accountNumber}</S.Text>
            <S.CopyIcon onClick={() => handleCopyClipBoard(accountNumber)} />
          </S.FlexBox>
        </S.DepositContainer>

        <Spacing marginBottom="3.2" />
        <a
          href="http://about.beatlive.kr/?utm_source=beatlive&utm_medium=bookcomplete&utm_campaign=25sum-event"
          target="blank"
        >
          <img src={PromotionImg} width={327} />
        </a>

        <Spacing marginBottom={space} />

        <S.FloatingWrapper>
          <Button variant="blue" size="xlarge" onClick={handleDepositClick}>
            토스로 송금하기
          </Button>
          <S.GigButtonBox onClick={handleLookup}>
            <S.GigText>예매내역 조회하기</S.GigText>
          </S.GigButtonBox>
        </S.FloatingWrapper>
      </S.Wrapper>
      <S.DepositBox>
        <Toast icon={<IconCheck />} isVisible={isToastVisible} isTop={true}>
          클립보드에 복사되었습니다!
        </Toast>
      </S.DepositBox>
    </>
  );
};

export default PaidBook;
