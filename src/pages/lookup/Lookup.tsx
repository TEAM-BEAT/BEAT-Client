import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LookupWrapper from "./components/LookupWrapper";
import NonExistent from "./components/nonExistent/NonExistent";
import * as S from "./Lookup.styled";
import {
  useGetMemberBookingList,
  useLazyPostGuestBookingList,
} from "@apis/domains/bookings/queries";
import Loading from "@components/commons/loading/Loading";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks";
import { useCancelBooking } from "src/hooks/useCancelBooking";
import { Toast } from "@components/commons";
import { IconCheck } from "@assets/svgs";
import { ToastMessage } from "./../../components/commons/toast/Toast.styled";

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
  const { state } = useLocation();
  const navigate = useNavigate();

  const { confirmCancelAction, toastMessage } = useCancelBooking(
    state?.bookerName,
    state?.number,
    state?.password
  );

  const { data: memberData, isLoading: isMemberLoading } = useGetMemberBookingList(); // 회원 예매 조회
  const { getCachedBookingList, fetchBookingList } = useLazyPostGuestBookingList();
  const cachedData = getCachedBookingList(state?.bookerName, state?.number, state?.password); // 비회원 예매 조회

  const handleCancel = (bookingId: number, totalPaymentAmount: number) => {
    if (totalPaymentAmount === 0) {
      confirmCancelAction({ bookingId });
      return;
    }

    const bookingDetails = (memberData ?? cachedData)?.find((item) => item.bookingId === bookingId);
    if (bookingDetails) {
      navigate("/lookup/cancel", { state: { ...state, bookingDetails } });
    }
  };

  useEffect(() => {
    if (state?.bookerName && state?.number && state?.password && !cachedData) {
      // 비회원 데이터가 캐시에 없을 경우 새로 가져옴
      fetchBookingList({
        name: state.bookerName,
        phone: state.number,
        password: state.password,
        birth: state.birth || "",
      });
    }
  }, [state, cachedData, fetchBookingList]);

  useEffect(() => {
    if (state?.toastMessage) {
      const timer = setTimeout(() => {
        navigate("/lookup", { state: { ...state, toastMessage: null }, replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "내가 예매한 공연",
      leftOnClick: () => navigate("/main"),
    });
  }, [setHeader]);

  return (
    <>
      {isMemberLoading || (!cachedData && !memberData) ? (
        <Loading />
      ) : (
        <S.LookupWrapper>
          <MetaTag title="내가 예매한 공연" />
          {(memberData ?? cachedData)?.length > 0 ? (
            (memberData ?? cachedData).map((item) => (
              <React.Fragment key={item.bookingId}>
                <LookupWrapper
                  {...item}
                  handleBtn={() => handleCancel(item.bookingId, item.totalPaymentAmount)}
                />
              </React.Fragment>
            ))
          ) : (
            <NonExistent />
          )}
          {(toastMessage || state?.toastMessage) && (
            <Toast icon={<IconCheck />} isVisible={true} toastBottom={32}>
              {toastMessage ?? state?.toastMessage}
            </Toast>
          )}
        </S.LookupWrapper>
      )}
    </>
  );
};

export default Lookup;
