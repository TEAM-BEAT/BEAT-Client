import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FreeBook from "../freeBook/FreeBook";
import PaidBook from "../paidBook/PaidBook";

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    id = 1,
    title = "",
    bankName = "",
    accountHolder = "",
    accountNumber = "3561202376833",
    totalPaymentAmount = 0,
  } = location.state || {};

  const isPaid = totalPaymentAmount !== 0 ? true : false;

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON,
      rightOnClick: () => {
        navigate("/main");
      },
    });
  }, [setHeader]);

  return (
    <>
      {isPaid ? (
        <PaidBook
          id={id}
          title={title}
          accountHolder={accountHolder}
          bankName={bankName}
          accountNumber={accountNumber}
          totalPaymentAmount={totalPaymentAmount}
        />
      ) : (
        <FreeBook id={id} title={title} />
      )}
    </>
  );
};

export default Complete;
