import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LookupWrapper from "./components/LookupWrapper";
import NonExistent from "./components/nonExistent/NonExistent";
import * as S from "./Lookup.styled";

import { dummyData } from "./dummyData";

import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";

import Button from "@components/commons/button/Button";

import { NAVIGATION_STATE } from "@constants/navigationState";
import { usePostGuestBookingList } from "@apis/domains/bookings/queries";
import { useHeader } from "@hooks/useHeader";
import { useEffect } from "react";

// dummyData 빈 배열일 경우 경우 (주석 처리하면서 사용)
// const dummyData: LookupProps[] = [];

const Lookup = () => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const { state } = useLocation();
  const [lookUpList, setLookUpList] = useState(dummyData);

  const navigate = useNavigate();

  const handleSheetOpen = (bookingId: number) => {
    setSelectedBookingId(bookingId);
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
      setLookUpList(state);
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
    <S.LookupWrapper>
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
                <PhoneNumber phone={item.bookerPhoneNumber} />
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
  );
};

export default Lookup;
