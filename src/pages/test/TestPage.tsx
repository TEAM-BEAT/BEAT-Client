import { IconTextfiedlDelete } from "@assets/svgs";
import Chip from "@components/commons/chip/Chip";

const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Test Page</p>
      <div>
        <Chip
          label="바보"
          color="pink"
          icon={<IconTextfiedlDelete />}
          onClick={() => console.log("clicked chip")}
        />
        <Chip label="테스트" />
      </div>
    </div>
  );
};

export default TestPage;
