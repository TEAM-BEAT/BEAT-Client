import useModal from "@hooks/useModal";
import styled from "styled-components";
import BankAccount from "./BankAccount";

const ModalTest = () => {
  const { openAlert, openConfirm, openModal } = useModal();

  const bankName1 = "농협";
  const bankNumber1 = "신지바보-5678-1234-5678";

  const bankName2 = "바보신지은행";
  const bankNumber2 = "메롱메롱-5678-1234-5678";

  const handleAlert = () => {
    openAlert({
      title: "얼럿",
      subTitle: "얼럿입니다.",
      okCallback: () => {
        console.log("얼럿 확인");
      },
    });
  };

  const handleConfirm = () => {
    openConfirm({
      title: "컨펌",
      subTitle: "컨펌입니다.",
      okText: "확인",
      okCallback: () => {
        console.log("컨펌 확인");
      },
      noText: "취소",
      noCallback: () => {
        console.log("컨펌 취소");
      },
    });
  };

  const handleModal = (bankName: string, number: string) => {
    // openModal({
    //   children: <BankAccount bankName={bankName} number={number} />,
    // });
  };

  return (
    <Wrapper>
      <button style={{ color: "white" }} onClick={handleAlert}>
        얼럿!
      </button>
      <button style={{ color: "white" }} onClick={handleConfirm}>
        컴펌!
      </button>
      <button style={{ color: "white" }} onClick={() => handleModal(bankName1, bankNumber1)}>
        모달!
      </button>

      <button style={{ color: "white" }} onClick={() => handleModal(bankName2, bankNumber2)}>
        모달!
      </button>
    </Wrapper>
  );
};

export default ModalTest;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
`;
