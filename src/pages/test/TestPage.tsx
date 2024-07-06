import styled from "styled-components";
import ViewBottomSheet from "../../components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Context from "@components/commons/contextBox/Context";

const TestPage = () => {
  return (
    <Test>
      <h1>Test Page</h1>
      <Test>Test Page</Test>
      <ViewBottomSheet />
    </Test>
  );
};

export default TestPage;

const Test = styled.div`
  background-color: white;
`;
