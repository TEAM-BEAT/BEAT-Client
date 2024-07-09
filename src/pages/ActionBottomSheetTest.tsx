import styled from "styled-components";
import { useState } from "react";
import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import Button from "@components/commons/button/Button";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";

const ActionBottomSheetTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSheetOpen = () => {
    setIsOpen(true);
  };

  const handleSheetClose = () => {
    setIsOpen(false);
  };

  return (
    <Test>
      <button onClick={handleSheetOpen}>dd</button>
      {isOpen && (
        <ActionBottomSheet
          onClickOutside={handleSheetClose}
          title="title"
          subTitle="sub title"
          alignItems="center"
          padding="2rem 2rem 2.4rem 2rem"
        >
          <PhoneNumber phone="010-XXXX-XXXX" />
          <OuterLayout margin="1.6rem 0 0 0">
            <Button variant="primary" size="xlarge">
              확인했어요
            </Button>
          </OuterLayout>
        </ActionBottomSheet>
      )}
    </Test>
  );
};

export default ActionBottomSheetTest;

const Test = styled.div`
  width: 37.5rem;
  height: 66.7rem;

  background-color: white;
`;
