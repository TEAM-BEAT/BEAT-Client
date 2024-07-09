import { IconCheck, IconTextfiedlDelete } from "@assets/svgs";
import InputAccountWrapper from "@components/commons/bank/bankInput/InputAccountWrapper";
import Button from "@components/commons/button/Button";
import Chip from "@components/commons/chip/Chip";
import TextArea from "@components/commons/input/textArea/TextArea";
import TextField from "@components/commons/input/textField/TextField";
import Spacing from "@components/commons/spacing/Spacing";
import Stepper from "@components/commons/stepper/Stepper";
import Toast from "@components/commons/toast/Toast";
import useToast from "@hooks/useToast";
import { numericFilter } from "@utils/useInputFilter";
import { useState } from "react";

const TestPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputAreaValue, setInputAreaValue] = useState("");
  const [round, setRound] = useState(1);
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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <TextField
          value={inputValue}
          onChangeValue={handleChangeInput}
          filter={numericFilter}
          maxLength={4}
          placeholder="비밀번호 숫자 4자리"
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

      <Button size="medium" variant="primary" onClick={showToast}>
        토스트 보이기
      </Button>
      <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
        클립보드에 복사되었습니다!
      </Toast>
      <InputAccountWrapper />
    </div>
  );
};

export default TestPage;
