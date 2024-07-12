import styled from "styled-components";

export const ChipsWrapper = styled.section`
  width: 37.5rem;
`;

export const ChipsLayout = styled.section`
  display: flex;
  gap: 0.4rem;
  padding: 1.6rem 2.4rem 0;
  overflow-x: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
`;

export const Chip = styled.button`
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 0.9rem 1.2rem;
`;
