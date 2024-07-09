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
    openAlert({
      title: `${item.accountNumber}`,
      subTitle: "얼럿입니다.",
      okCallback: () => {
        setAccountModal(false);
      },
    });
  };

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
