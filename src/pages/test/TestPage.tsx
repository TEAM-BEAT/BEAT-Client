import styled from "styled-components";
import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";

const TestPage = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ActionBottomSheet title="title" subTitle="sub title">
        <PhoneNumber phone="010-XXXX-XXXX" />
      </ActionBottomSheet>
    </Test>
  );
};

export default TestPage;

const Test = styled.div`
  background-color: white;
`;
