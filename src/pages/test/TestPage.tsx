import TextArea from "@components/commons/inputs/textAreas/TextArea";
import TextField from "@components/commons/inputs/textFields/TextField";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";

const TestPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center" }}>
      <h1>Test Page</h1>
      <p>Test Page</p>
      <TextField unit={"time"} filter={numericFilter} placeholder="입력해주세요" />
      <TextField unit={"ticket"} filter={numericFilter} placeholder="입력해주세요" />
      <TextField unit={"amount"} filter={priceFilter} placeholder="입력해주세요" />
      <TextField filter={phoneNumberFilter} placeholder="입력해주세요" />
      <TextField maxLength={30} placeholder="입력해주세요" />
      <TextArea maxLength={300} placeholder="입력해주세요" />
      <TextArea placeholder="입력해주세요" />
    </div>
  );
};

export default TestPage;
