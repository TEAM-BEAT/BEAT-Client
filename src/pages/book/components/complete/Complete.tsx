import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useLogin, useModal } from "@hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FreeBook from "../freeBook/FreeBook";
import PaidBook from "../paidBook/PaidBook";
import { trackEvent } from "src/track/track";
import { TRACK_EVENTS } from "src/track/constants/events";

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin } = useLogin();
  const { openAlert } = useModal();

  const {
    id = 1,
    title = "",
    bankName = "",
    accountHolder = "",
    accountNumber = "",
    totalPaymentAmount = 0,
  } = location.state || {};

  const isPaid = totalPaymentAmount !== 0 ? true : false;

  const { setHeader } = useHeader();

  const handleLookup = () => {
    if (isLogin) {
      navigate("/lookup");
    } else {
      navigate("/nonmb-lookup");
    }
  };

  //URL 직접 입력시
  useEffect(() => {
    if (!title) {
      openAlert({
        title: "잘못된 접근입니다.",
        okCallback: () => {
          navigate("/main");
        },
      });
    }
  }, []);

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON,
      rightOnClick: () => {
        navigate(`/gig/${id}`);
      },
    });
  }, [setHeader]);

  useEffect(() => {
    trackEvent(TRACK_EVENTS.VIEWED_PAGE_BOOKCOMPLETE);
  }, []);

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
