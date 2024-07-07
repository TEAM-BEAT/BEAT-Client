import useModal from "@hooks/useModal";
import styled from "styled-components";

const ModalTest = () => {
  const { openAlert, openConfirm } = useModal();

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

  return (
    <Wrapper>
      <button style={{ color: "white" }} onClick={handleAlert}>
        얼럿!
      </button>
      <button style={{ color: "white" }} onClick={handleConfirm}>
        컴펌!
      </button>
    </Wrapper>
  );
};

export default ModalTest;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
`;
