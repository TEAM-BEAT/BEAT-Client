import styled from "styled-components";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Context from "@components/commons/contextBox/Context";
import Button from "@components/commons/button/Button";

const ViewBottomSheetTest = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ViewBottomSheet title="title" boxTitle="공연 제목">
        <Context isDate={true} subTitle="날짜" date="20XX. XX. XX" time="XX:XX" />
        <Context subTitle="가격" text="100,000원 (2매)" />
        <Context subTitle="예매자" text="서지우" />
        <ButtonLayout>
          <Button variant="gray" size="medium">
            다시 할게요
          </Button>
          <Button variant="primary" size="medium">
            예매할게요
          </Button>
        </ButtonLayout>
      </ViewBottomSheet>
    </Test>
  );
};

export default ViewBottomSheetTest;

const Test = styled.div`
  background-color: white;
`;

// test 페이지에 한 번에 볼 수 있도록 styled를 아래 넣었습니다! 실제로 사용할 때는 분리해 주세요!
const ButtonLayout = styled.section`
  display: flex;
  gap: 1.1rem;
  margin-top: 2.4rem;
`;
