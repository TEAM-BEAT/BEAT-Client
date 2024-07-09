import styled from "styled-components";

interface SpacingPropTypes {
  marginBottom: string;
}

const Spacing = ({ marginBottom }: SpacingPropTypes) => {
  return <SpacingBox $marginBottom={marginBottom} />;
};

export default Spacing;

const SpacingBox = styled.div<{ $marginBottom: string }>`
  margin-bottom: ${(props) => props.$marginBottom || "0"}rem;
`;
