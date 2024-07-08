import styled from "styled-components";
import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import Button from "@components/commons/button/Button";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";

const ActionBottomSheetTest = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ActionBottomSheet title="title" subTitle="sub title">
        <PhoneNumber phone="010-XXXX-XXXX" />
        <OuterLayout margin="1.6rem 0 0 0">
          <Button variant="primary" size="xlarge">
            확인했어요
          </Button>
        </OuterLayout>
      </ActionBottomSheet>
    </Test>
  );
};

export default ActionBottomSheetTest;

const Test = styled.div`
  background-color: white;
`;
