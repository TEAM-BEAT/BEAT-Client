import TextArea from "@components/commons/inputs/textAreas/TextArea";
import TextField from "@components/commons/inputs/textFields/TextField";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import { useState } from "react";

const TestPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputAreaValue, setInputAreaValue] = useState("");

  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };
  const handleChangeInputArea = (value: string) => {
    setInputAreaValue(value);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center" }}>
      <h1>Test Page</h1>
      <p>Test Page</p>
      <TextField
        value={inputValue}
        onChangeValue={handleChangeInput}
        maxLength={30}
        placeholder="입력해주세요"
      />
      <TextArea
        value={inputAreaValue}
        onChangeValue={handleChangeInputArea}
        maxLength={300}
        placeholder="입력해주세요"
      />
    </div>
  );
};

export default TestPage;
