import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FreeBook from "../freeBook/FreeBook";
import PaidBook from "../paidBook/PaidBook";

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // TODO: 기본 값 수정
  const {
    id = 1,
    title = "비트 정기공연",
    bankName = "농협",
    accountNumber = "3561202376833",
    price = 100002,
  } = location.state || {};

  const isPaid = price !== 0 ? true : false;

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
          bankName={bankName}
          accountNumber={accountNumber}
          price={price}
        />
      ) : (
        <FreeBook id={id} title={title} />
      )}
    </>
  );
};

export default Complete;
