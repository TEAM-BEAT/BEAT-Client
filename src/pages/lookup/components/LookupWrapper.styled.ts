import styled from "styled-components";
import { Subtract } from "@assets/svgs";

export const LookupLayout = styled.section`
  display: flex;
  width: auto;
`;

// layout + contextBox => 얘를 map 돌리기
export const LookupContainer = styled.section`
  display: flex;
  gap: 0.8rem;
  width: auto;
  padding: 0.8rem 2.4rem;
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

export const SubtractBox = styled(Subtract)`
  position: absolute;
  width: 3.6rem;
  height: 2.4rem;
  margin-top: 1rem;
`;

export const DueDate = styled.div`
  position: absolute;
  margin: 1.3rem 0 0 0.6rem;

  color: ${({ theme }) => theme.colors.pink_400};

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;
