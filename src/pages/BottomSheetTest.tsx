// TestPage.tsx

import styled from "styled-components";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Context from "@components/commons/contextBox/Context";

const TestPage = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ViewBottomSheet title="title" boxTitle="공연 제목">
        <Context isDate={true} subTitle="날짜" date="20XX. XX. XX" time="XX:XX" />
        <Context subTitle="가격" text="100,000원 (2매)" />
        <Context subTitle="예매자" text="서지우" />
      </ViewBottomSheet>
    </Test>
  );
};

export default TestPage;

const Test = styled.div`
  background-color: white;
`;
