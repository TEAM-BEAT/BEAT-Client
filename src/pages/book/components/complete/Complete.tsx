import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import useLogin from "@hooks/useLogin";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FreeBook from "../freeBook/FreeBook";
import PaidBook from "../paidBook/PaidBook";

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin } = useLogin();

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

  const handleLookup = () => {
    if (isLogin) {
      navigate("/lookup");
    } else {
      navigate("/NonMb-Lookup");
    }
  };

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
          handleLookup={handleLookup}
        />
      ) : (
        <FreeBook id={id} title={title} handleLookup={handleLookup} />
      )}
    </>
  );
};

export default Complete;
