import React from "react";
import styled from "styled-components";

interface IntroduceContainerProps {
  children: React.ReactNode;
}

const IntroduceContainer = ({ children }: IntroduceContainerProps) => {
  return <IntroduceBox>{children}</IntroduceBox>;
};

export default IntroduceContainer;

export const IntroduceBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.4rem;
`;
