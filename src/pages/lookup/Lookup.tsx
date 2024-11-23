import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LookupWrapper from "./components/LookupWrapper";
import NonExistent from "./components/nonExistent/NonExistent";
import * as S from "./Lookup.styled";
import { useGetMemberBookingList } from "@apis/domains/bookings/queries";
import Loading from "@components/commons/loading/Loading";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";

interface LookupProps {
  userId: number;
  bookingId: number;
  scheduleId: number;
  performanceId: number;
  performanceTitle: string;
  performanceDate: string;
  performanceVenue: string;
  purchaseTicketCount: number;
  scheduleNumber: string;
  bookerName: string;
  bookerPhoneNumber: string;
  bankName: string;
  performanceContact: string;
  accountNumber: string;
  accountHolder: string;
  dueDate: number;
  bookingStatus: string;
  isPaymentCompleted: boolean;
  createdAt: string;
  posterImage: string;
  totalPaymentAmount: number;
}

const Lookup = () => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const { state } = useLocation();
  const { openConfirm, closeConfirm } = useModal();
  const [lookUpList, setLookUpList] = useState<LookupProps[]>([]);
  const { isLoading, refetch } = useGetMemberBookingList();

  const navigate = useNavigate();

  const handleCancel = (bookingId: number, totalPaymentAmount: number) => {
    if (totalPaymentAmount === 0) {
      setSelectedBookingId(bookingId);
      openConfirm({
        title: "예매를 정말 취소하시겠어요?",
        subTitle: "취소한 예매내역은 복구할 수 없어요.",
        okText: "취소할게요",
        okCallback: () => {},
        noText: "아니요",
        noCallback: closeConfirm,
      });
      return;
    }
    const bookingDetails = lookUpList.find((item) => item.bookingId === bookingId);
    if (bookingDetails) {
      navigate("/cancel", { state: bookingDetails });
    }
  };

  const handleSheetClose = () => {
    setSelectedBookingId(null);
  };

  const { setHeader } = useHeader();

  const handleLeftBtn = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (state) {
      setLookUpList(state as LookupProps[]);
    } else {
      refetch().then((refetchedData) => {
        setLookUpList(refetchedData.data as LookupProps[]);
      });
    }
  }, []);

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "내가 예매한 공연",
      leftOnClick: handleLeftBtn,
    });
  }, [setHeader]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <S.LookupWrapper>
          <MetaTag title="내가 예매한 공연" />
          {lookUpList.length ? (
            <>
              {lookUpList.map((item) => (
                <React.Fragment key={item.bookingId}>
                  <LookupWrapper
                    {...item}
                    handleBtn={() => handleCancel(item.bookingId, item.totalPaymentAmount)}
                  />
                </React.Fragment>
              ))}
            </>
          ) : (
            <NonExistent />
          )}
        </S.LookupWrapper>
      )}
    </>
  );
};

export default Lookup;
