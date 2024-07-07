// TestPage.tsx

import styled from "styled-components";
import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";
import Button from "@components/commons/button/Button";

const ActionBottomSheetTest = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ActionBottomSheet title="title" subTitle="sub title">
        <PhoneNumber phone="010-XXXX-XXXX" />
        <ButtonLayout>
          <Button variant="primary" size="xlarge">
            확인했어요
          </Button>
        </ButtonLayout>
      </ActionBottomSheet>
    </Test>
  );
};

export default ActionBottomSheetTest;

const Test = styled.div`
  background-color: white;
`;

// test 페이지에 한 번에 볼 수 있도록 styled를 아래 넣었습니다! 실제로 사용할 때는 분리해 주세요!
const ButtonLayout = styled.section`
  display: flex;

  margin-top: 1.6rem;
`;
