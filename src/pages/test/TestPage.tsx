import TextArea from "@components/commons/inputs/textAreas/TextArea";
import TextField from "@components/commons/inputs/textFields/TextField";
import { numericFilter, phoneNumberFilter } from "@utils/useInputFiter";

const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Test Page</p>
      <TextField filter={numericFilter} unit={"time"} placeholder="관람 매수" />
    </div>
  );
};

export default TestPage;
