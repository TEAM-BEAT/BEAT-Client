import styled from "styled-components";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Context from "@components/commons/contextBox/Context";

const TestPage = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ViewBottomSheet title="title" boxTitle="공연 제목">
        {/* 사용 시 빠른 이해를 위해 임시로 넣어둔 context입니다. 사용 시 ContextBox 내에 Context를 children으로 넘긴 뒤 원하는 내용을 props로 넘겨주세요! */}
        {/* 날짜의 경우 isDate를 true로 주고, date와 time에 날짜와 시간을 넣어주면 됩니다. */}
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
