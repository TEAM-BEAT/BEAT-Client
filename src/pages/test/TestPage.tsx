import TextArea from "@components/commons/inputs/textAreas/TextArea";
import TextField from "@components/commons/inputs/textFields/TextField";

const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Test Page</p>
      <TextArea placeholder="placeholder" maxLength={300} />
    </div>
  );
};

export default TestPage;
