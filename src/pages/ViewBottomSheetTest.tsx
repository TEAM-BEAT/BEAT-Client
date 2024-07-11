import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Button from "@components/commons/button/Button";
import Context from "@components/commons/contextBox/Context";
import { useState } from "react";
import styled from "styled-components";

const ViewBottomSheetTest = () => {
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
        <ViewBottomSheet
          onClickOutside={handleSheetClose}
          title="title"
          boxTitle="공연 제목"
          boxTitleColor="pink_200"
        >
          <Context isDate={true} subTitle="날짜" date="20XX. XX. XX" time="XX:XX" />
          <Context subTitle="가격" text="100,000원 (2매)" />
          <Context subTitle="예매자" text="서지우" />
          <OuterLayout gap="1.1rem" margin="2.4rem 0 0 0">
            <Button variant="gray" size="medium">
              다시 할게요
            </Button>
            <Button variant="primary" size="medium">
              예매할게요
            </Button>
          </OuterLayout>
        </ViewBottomSheet>
      )}
    </Test>
  );
};

export default ViewBottomSheetTest;

const Test = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;

  background-color: white;
`;
