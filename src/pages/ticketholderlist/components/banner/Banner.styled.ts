import styled from "styled-components";

export const BannerWrapper = styled.div<{ $image: string }>`
  width: 37.5rem;
  height: 7.2rem;

  /* 사용자가 입력한 이미지 background 적당히 잘라서 사용하도록 */
  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const BannerTextLayout = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 37.5rem;
  height: 7.2rem;

  background: rgb(0 0 0 / 60%);
`;

export const BannerTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 32.7rem;
`;

export const BannerTitleText = styled.span`
  width: 17.7rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const BannerStateTextBox = styled.span`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
`;

export const CountTextSpan = styled.span`
  color: ${({ theme }) => theme.colors.pink_400};
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
`;
