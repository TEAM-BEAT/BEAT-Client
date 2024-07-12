import styled from "styled-components";

export const PerformanceWrapper = styled.section`
  padding: 2.4rem;

  color: ${({ theme }) => theme.colors.gray_900};
`;

export const PerformanceLayout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 1.3rem;
`;

export const BannerWrapper = styled.button`
  width: auto;
`;

export const Banner = styled.div<{ $image: string }>`
  display: flex;
  width: 32.7rem;
  height: 9.2rem;

  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 0.6rem;
`;
