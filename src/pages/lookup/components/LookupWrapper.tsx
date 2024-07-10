import * as S from "./LookupWrapper.styled";
import { useEffect, useState } from "react";

import useModal from "@hooks/useModal";

import Button from "@components/commons/button/Button";
import LookupCard from "./LookupCard";

const LookupWrapper = ({ ...item }) => {
  const { openAlert, closeAlert } = useModal();

  const [accountModal, setAccountModal] = useState(false);

  const handleAccountModal = () => {
    setAccountModal(true);
  };

  const handleAlert = () => {
    // 이 부분 도영 오빠가 children 받을 수 있는 빈 모달 만들어주면 복사 가능하도록 변경
    openAlert({
      title: `${item.accountNumber}`,
      okCallback: () => {
        setAccountModal(false);
      },
    });
  };

  // 현재 모달 바깥을 선택했을 때 account가 false로 변하지 않아 새로 열리지 않는데,
  // 디자인 측에서 모달 바깥 선택하지 못하게 한다는 의견이 있어 일단 두겠습니다!
  useEffect(() => {
    if (accountModal) {
      handleAlert();
    } else {
      closeAlert();
    }
  }, [accountModal]);

  return (
    <S.LookupLayout>
      <S.LookupContainer>
        <S.LookupCardLeft>
          <S.TempImage />
          <Button variant="line" size="xsmall">
            취소하기
          </Button>
        </S.LookupCardLeft>
        <LookupCard
          createdAt={item.createdAt}
          performanceDate={item.performanceDate}
          performanceTitle={item.performanceTitle}
          scheduleNumber={item.scheduleNumber}
          performanceVenue={item.performanceVenue}
          purchaseTicketCount={item.purchaseTicketCount}
          paymentStatus={item.paymentStatus}
          handleAccount={handleAccountModal}
          {...item}
        ></LookupCard>
      </S.LookupContainer>
    </S.LookupLayout>
  );
};

export default LookupWrapper;
