import styled from "styled-components";
import { Subtract } from "@assets/svgs";
import { BannerBasic } from "@assets/svgs";

export const PerformanceWrapper = styled.section`
  padding: 2.4rem;

  color: ${({ theme }) => theme.colors.gray_900};
`;

export const PerformanceLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 1.3rem;
`;

export const PerformanceCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
`;

export const PerformanceImg = styled.image`
  position: relative;
  width: 15.7rem;
  height: 22.4rem;

  background-color: white;
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
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body2-normal-semi"]};
`;

export const BannerWrapper = styled.button`
  width: auto;
`;

export const Banner = styled(BannerBasic)`
  display: flex;
  width: 32.7rem;
  height: 9.2rem;

  border-radius: 0.6rem;
`;
