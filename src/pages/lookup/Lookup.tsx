import React, { useState } from "react";
import * as S from "./Lookup.styled";
import NonExistent from "./components/nonExistent/NonExistent";
import LookupWrapper from "./components/LookupWrapper";

import { dummyData } from "./dummyData";

import { LookupProps } from "./types/lookupType";

import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";

import Button from "@components/commons/button/Button";

import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { useEffect } from "react";

// dummyData 빈 배열일 경우 경우 (주석 처리하면서 사용)
// const dummyData: LookupProps[] = [];

const Lookup = () => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [lookUpList, setLookUpList] = useState(dummyData);

  const handleSheetOpen = (bookingId: number) => {
    setSelectedBookingId(bookingId);
  };

  const handleSheetClose = () => {
    setSelectedBookingId(null);
  };

  const { setHeader } = useHeader();

  const handleLeftBtn = () => {
    alert("왼쪽 버튼 클릭!");
  };
  const handleRightBtn = () => {
    alert("오른쪽 버튼 클릭!");
  };
  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_ICON,
      title: "헤더 테스트!",
      subText: "굿",
      leftOnClick: handleLeftBtn,
      rightOnClick: handleRightBtn,
    });
  }, [setHeader]);

  return (
    <S.LookupWrapper>
      {lookUpList.length ? (
        <>
          {lookUpList.map((item) => (
            <React.Fragment key={item.bookingId}>
              <LookupWrapper {...item} handleBtn={() => handleSheetOpen(item.bookingId)} />
              {selectedBookingId === item.bookingId && (
                <ActionBottomSheet
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
              )}
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
