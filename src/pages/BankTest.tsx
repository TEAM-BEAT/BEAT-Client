import BankBottomSheet from "@components/commons/bank/bottomSheet/BankBottomSheet";
import styled from "styled-components";
import { useEffect, useState } from "react";
import InputAccountWrapper from "@components/commons/bank/InputAccountWrapper";
import InputBank from "@components/commons/bank/InputBank";
import { numericFilter } from "@utils/useInputFilter";
import TextField from "@components/commons/input/textField/TextField";

const BankTest = () => {
  const [bankOpen, setBankOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState("");
  const [accountInfo, setAccountInfo] = useState("");

  const handleBankOpen = () => {
    setBankOpen((current) => !current);
  };
  const handleBankClick = (value: string) => {
    setBankInfo(value);
    handleBankOpen();
  };
  const handleChangeInput = (value: string) => {
    setAccountInfo(value);
  };

  return (
    <Test>
      <InputAccountWrapper>
        <InputBank onClick={handleBankOpen}>{bankInfo}</InputBank>
        <TextField
          value={accountInfo}
          onChangeValue={handleChangeInput}
          filter={numericFilter}
          placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
        />{" "}
      </InputAccountWrapper>
      {bankOpen && (
        <BankBottomSheet
          value={bankInfo}
          onBankClick={handleBankClick}
          onOutClick={handleBankOpen}
        />
      )}
    </Test>
  );
};

export default BankTest;

const Test = styled.div`
  width: 37.5rem;
  height: 660.7rem;
  padding: 0 2.4rem;
`;
