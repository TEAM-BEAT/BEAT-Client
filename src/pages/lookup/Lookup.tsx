import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LookupWrapper from "./components/LookupWrapper";
import NonExistent from "./components/nonExistent/NonExistent";
import * as S from "./Lookup.styled";

import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";

import Button from "@components/commons/button/Button";

import { useGetMemberBookingList } from "@apis/domains/bookings/queries";
import Loading from "@components/commons/loading/Loading";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks";

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
  const [lookUpList, setLookUpList] = useState<LookupProps[]>([]);
  const { data, isLoading } = useGetMemberBookingList();

  const navigate = useNavigate();

  const handleSheetOpen = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    console.log(lookUpList);
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
    }
  }, []);

  useEffect(() => {
    if (!state && data) {
      setLookUpList(data as LookupProps[]);
    }
  }, [data]);

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
                  <LookupWrapper {...item} handleBtn={() => handleSheetOpen(item.bookingId)} />
                  <ActionBottomSheet
                    isOpen={selectedBookingId === item.bookingId}
                    onClickOutside={handleSheetClose}
                    title="대표자에게 연락하여 취소를 요청해 주세요"
                    subTitle="대표자 연락처"
                    alignItems="center"
                    padding="2rem 2rem 2.4rem 2rem"
                  >
                    <PhoneNumber phone={item.performanceContact} />
                    <OuterLayout margin="1.6rem 0 0 0">
                      <Button onClick={handleSheetClose}>확인했어요</Button>
                    </OuterLayout>
                  </ActionBottomSheet>
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
