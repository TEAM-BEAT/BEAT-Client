import styled from "styled-components";

export const BodyWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37.4rem;
  height: auto;
  min-height: 66.4rem; /* 60.8rem(body의 높이) +  5.6rem(헤더의 높이) */
  padding: 2.4rem;
`;

export const BodyNothingLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  width: 32.6rem;
  height: auto;
`;

export const GrapicImg = styled.div`
  width: 12.6rem;
  height: 12.6rem;

  /* background-image: ; 나중에 얘로 대체 예정 */
  background-color: red;
  border-radius: 10px;
`;

export const NothingText = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1.1rem;

  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 2.4rem;
`;

export const BodyLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  align-self: stretch;
  min-width: 32.6rem;
  min-height: 41.2rem; /* 41.2rem 으로 지정되어 있으나, 늘어날 수 있다고 판단 */

  /* 다음 2줄은 header를 계산해서 그만큼 5.6rem 만큼 내려줌 */

  /* position: relative;
  top: 5.6rem; */

  /* 그러나, 위의 방식대로라면 부모 요소가 안 늘어나므로 margin 이용으로 변경 */
  margin-top: 5.6rem;
`;

export const Banner = styled.div<{ imgsrc: string }>`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  justify-content: center;
  width: 32.6rem;
  height: 6.4rem;
  padding: 1.6rem;

  background-image: url(${(prop) => prop.imgsrc});
  border-radius: 6px;
`;

export const BannerText = styled.span`
  min-width: 18.4rem;

  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const BannerButtonText = styled.span`
  ${({ theme }) => theme.fonts["caption1-semi"]};
`;

export const RegisteredCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  align-self: stretch;
`;
