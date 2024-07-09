import styled from "styled-components";

export const LookupLayout = styled.section`
  display: flex;
  width: auto;
`;

// layout + contextBox => 얘를 map 돌리기
export const LookupContainer = styled.section`
  display: flex;
  gap: 0.8rem;
  width: auto;
  padding: 2.4rem;
`;

// 사진 및 취소하기 버튼
export const LookupCardLeft = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const TempImage = styled.div`
  width: 10.5rem;
  height: 15.4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.6rem;
`;
