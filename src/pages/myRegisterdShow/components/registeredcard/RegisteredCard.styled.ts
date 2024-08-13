import styled from "styled-components";

export const CardWrapper = styled.article`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  align-self: stretch; /* 부모 요소의 높이에 맞게 확장 (보조축에 맞게 확장) */
  height: 15.4rem;
`;

export const CardImg = styled.div<{ imgsrc: string }>`
  position: relative;
  width: 10.8rem;
  height: 15.4rem;

  background-image: url(${({ imgsrc }) => imgsrc});

  /* 아래의 한 줄 덕분에, 알맞게 이미지 조절 가능 */
  background-size: 100% 100%;
  border-radius: 6px;
`;

export const CardInfo = styled.div`
  display: flex;

  /* flex-grow, flex-shrink, flex-basis 설정, width는 자동 조절될 것 */
  flex: 1 0 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between; /* 해결법!! 무조건 따라하지말고 의도를 파악하자. */
  height: 15.4rem;
`;

export const CardInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  align-self: stretch; /* row 방향으로 늘림 */
`;
export const CardInfoTextTitleBox = styled.div`
  display: flex;
  flex-direction: column;

  /* gap: 1.2rem : 이것도 자연스럽게 생기는 것이라서 없애는 게 맞음 */
  align-items: flex-start;
  align-self: stretch;
`;

export const CardInfoGenreText = styled.span`
  align-self: stretch;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const CardInfoTitleText = styled.span`
  align-self: stretch;
  width: 21rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme }) => theme.fonts.heading4};
`;

export const CardInfoPeriodBox = styled.span`
  align-self: stretch;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["caption1-medi"]};
`;

export const CardInfoButtonBoxWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  align-self: stretch;
`;
export const CardInfoButtonBox = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin-bottom: 0.2rem;
`;
