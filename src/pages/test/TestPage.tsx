import { IconCheck, IconTextfiedlDelete } from "@assets/svgs";
import Button from "@components/commons/button/Button";
import Chip from "@components/commons/chip/Chip";
import TextArea from "@components/commons/input/textArea/TextArea";
import TextField from "@components/commons/input/textField/TextField";
import Spacing from "@components/commons/spacing/Spacing";
import Stepper from "@components/commons/stepper/Stepper";
import TimePicker from "@components/commons/timepicker/TimePicker";
import Toast from "@components/commons/toast/Toast";
import useToast from "@hooks/useToast";
import { useState } from "react";
import { Dayjs } from "dayjs";

const TestPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputAreaValue, setInputAreaValue] = useState("");
  const [round, setRound] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const { showToast, isToastVisible } = useToast();

  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };
  const handleChangeInputArea = (value: string) => {
    setInputAreaValue(value);
  };
  const onMinusClick = () => {
    setRound((prev) => prev - 1);
  };
  const onPlusClick = () => {
    setRound((prev) => prev + 1);
  };
  const handleDateChange = (value: Dayjs | null) => {
    setSelectedDate(value);
  };
  console.log(selectedDate);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
      <div style={{ display: "flex" }}>
        <Chip
          label="바보"
          color="pink"
          icon={<IconTextfiedlDelete />}
          onClick={() => console.log("clicked chip")}
        />
        <Chip label="테스트" />
      </div>
      <Spacing marginBottom="3" />
      <Stepper max={3} round={round} onMinusClick={onMinusClick} onPlusClick={onPlusClick} />
      <TimePicker value={selectedDate} onChangeValue={handleDateChange} />{" "}
      <Button size="medium" variant="primary" onClick={showToast}>
        토스트 보이기
      </Button>
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
        클립보드에 복사되었습니다!
      </Toast>
    </div>
  );
};

export default TestPage;
