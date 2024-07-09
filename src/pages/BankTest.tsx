import Bank from "@components/commons/bank/Bank";
import styled from "styled-components";
import { useState } from "react";

const BankTest = () => {
  const [bankOpen, setBankOpen] = useState(false);
  const handleBankOpen = () => {
    setBankOpen((current) => !current);
  };
  return (
    <Test>
      <div onClick={handleBankOpen}>dd</div>
      {bankOpen && <Bank onClick={handleBankOpen} />}
    </Test>
  );
};

export default BankTest;

const Test = styled.div`
  width: 37.5rem;
  height: 660.7rem;

  background-color: white;
`;
