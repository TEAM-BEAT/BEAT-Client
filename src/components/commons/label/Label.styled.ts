import styled from "styled-components";
import { Subtract } from "@assets/svgs";

export const LabelWrapper = styled.section`
  position: absolute;
`;

export const CountLabel = styled(Subtract)`
  position: absolute;
  width: 3.6rem;
  height: 2.4rem;
  margin-top: 1rem;
`;

export const CountDueDate = styled.div`
  position: absolute;
  width: 3.6rem;
  margin: 1.3rem 0 0 ;

  color: ${({ theme }) => theme.colors.pink_400};

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;

export const FinishLabel = styled(Subtract)`
  position: absolute;
  width: 6rem;
  height: 2.4rem;
  margin-top: 1rem;
`;

export const FinishDueDate = styled.div`
  position: absolute;
  width: 5.8rem;
  margin: 1.3rem 0 0 0.6rem;

  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;

export const TodayLabel = styled(Subtract)`
  position: absolute;
  width: 5rem;
  height: 2.4rem;
  margin-top: 1rem;
`;

export const TodayDueDate = styled.div`
  position: absolute;
  width: 5rem;
  margin: 1.3rem 0 0 0.6rem;

  color: ${({ theme }) => theme.colors.pink_400};

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;
