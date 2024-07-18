import { IcHamburgar, IconArrowLeft, IconArrowRight, IconLogo, IconXButton } from "@assets/svgs";
import styled from "styled-components";

export const NavigationWrapper = styled.div`
  position: fixed;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 37.5rem;
  height: 5.6rem;
  padding: 1.2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_900};

  /* backdrop-filter: blur(10px); */
`;

export const Logo = styled(IconLogo)`
  box-sizing: content-box;
  width: 7.1rem;
  height: 2.5rem;
  padding: 0.4rem 0.2rem 0.3rem;

  cursor: pointer;
`;

export const NavigationTitle = styled.h1`
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const HamburgarButton = styled(IcHamburgar)`
  width: 3.2rem;
  height: 3.2rem;

  cursor: pointer;
`;

export const NavigationLeftButton = styled(IconArrowLeft)`
  box-sizing: content-box;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;

  cursor: pointer;
`;

export const NavigationRightButton = styled(IconArrowRight)`
  box-sizing: content-box;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;

  cursor: pointer;
`;

export const NavigationXButton = styled(IconXButton)`
  box-sizing: content-box;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;

  cursor: pointer;
`;

// TODO: 뷰에 띄워보니 padding이 없어 스타일링 이상함 디자이너 분께 물어보기
export const SubTextButton = styled.button`
  width: 3.2rem;
  margin: 0 0.4rem 0 0;

  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.pink_400};
`;

export const FragmentDiv = styled.div`
  width: 3.2rem;
`;

export const RightDiv = styled.div`
  display: flex;
  box-sizing: content-box;
  width: 2.4rem;
  height: 2.4rem;
`;
