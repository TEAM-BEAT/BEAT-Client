import Bank from "@components/commons/bank/BankBottomSheet";
import styled from "styled-components";
import { useState } from "react";
import InputAccountWrapper from "@components/commons/bank/bankInput/InputAccountWrapper";
import InputBank from "@components/commons/bank/bankInput/InputBank";
import { numericFilter } from "@utils/useInputFilter";
import TextField from "@components/commons/input/textField/TextField";

const BankTest = () => {
  const [bankOpen, setBankOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState("");
  const [accountInfo, setAccountInfo] = useState("");

  const handleBankOpen = () => {
    setBankOpen((current) => !current);
  };
  const handleChangeInput = (value: string) => {
    setAccountInfo(value);
  };
  return (
    <Test>
      <InputAccountWrapper>
        <InputBank onClick={handleBankOpen} />
        <TextField
          value={accountInfo}
          onChangeValue={handleChangeInput}
          filter={numericFilter}
          placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
        />{" "}
      </InputAccountWrapper>
      {bankOpen && <Bank onClick={handleBankOpen} />}
    </Test>
  );
};

export default BankTest;

const Test = styled.div`
  width: 37.5rem;
  height: 660.7rem;
  padding: 0 2.4rem;
`;
