import styled from "styled-components";

const test = () => {
  return (
    <Test>
      <Container />
      <Button />
    </Test>
  );
};

export default test;

const Test = styled.div`
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-color: #f0f0f0;
`;

const Button = styled.button`
  padding: 10px 20px;

  color: white;
  font-size: 16px;

  background-color: #007bff;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;
