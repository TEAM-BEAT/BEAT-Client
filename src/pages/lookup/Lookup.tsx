import React, { useState } from "react";
import * as S from "./Lookup.styled";
import { dummyData } from "./dummyData";

import NonExistent from "./components/nonExistent/NonExistent";
import LookupWrapper from "./components/LookupWrapper";

import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";

import Button from "@components/commons/button/Button";

const Lookup = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(0);

  const handleSheetOpen = (bookingId: number) => {
    setSelectedBookingId(bookingId);
  };

  const handleSheetClose = () => {
    setSelectedBookingId(0);
  };

  return (
    <S.LookupWrapper>
      {dummyData.length ? (
        <>
          {dummyData.map((item) => (
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
                    <Button size="xlarge" onClick={handleSheetClose}>
                      확인했어요
                    </Button>
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
