import styled from "styled-components";

export const BodyWrapper = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 37.4rem;
  height: auto;
  min-height: 60.8rem; /* 60.8rem(body의 높이) +  5.6rem(헤더의 높이) */
  padding: 2.4rem;
`;

export const BodyLayout = styled.section`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 2.4rem;
  align-items: flex-start;
`;

export const LayoutHeaderBox = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: flex-end;
  align-self: stretch;
`;

export const LayoutFilterBox = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;
