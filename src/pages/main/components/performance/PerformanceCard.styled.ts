import { Subtract } from "@assets/svgs";
import styled from "styled-components";

export const PerformanceCardWrapper = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;

  text-align: start;
`;

export const PerformanceImg = styled.img`
  position: relative;
  width: calc(21rem * 3 / 4);
  height: 21rem;
  object-fit: cover;
  object-position: center;

  background-color: black;
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

export const PerformanceTitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PerformanceTitle = styled.div`
  width: 15.6rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PerformancePeriod = styled.div`
  color: ${({ theme }) => theme.colors.gray_500};

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;

export const PerformancePrice = styled.div`
  margin-top: 0.4rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body2-normal-semi"]};
`;
