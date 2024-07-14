import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FreeBook from "../freeBook/FreeBook";
import PaidBook from "../paidBook/PaidBook";

const Complete = () => {
  const navigation = useNavigate();
  const isPaid = false;

  // TODO: state로 받아오기
  const title = "비트 정기공연";
  const bankName = "농협";
  const accountNumber = "3561202376833";
  const price = 10000;
  const id = 1;

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON,
      title: "내가 등록한 공연",
      subText: "삭제",
      rightOnClick: () => {
        navigation("/");
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
        <FreeBook title={title} id={id} />
      )}
    </>
  );
};

export default Complete;
