import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div<{ $showAllImages: boolean; $toggleAvailable: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: ${({ $showAllImages, $toggleAvailable }) =>
    $showAllImages ? "auto" : $toggleAvailable && "70rem"};
  overflow: ${({ $showAllImages }) =>
    $showAllImages ? "visible" : "hidden"}; /* 이미지의 하단 부분을 잘라내도록 설정 */
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const ShowMoreButton = styled.button`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  padding: 1.6rem 9.1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body1-normal-semi"]};

  background-color: ${({ theme }) => theme.colors.gray_900};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gray_700};
  border-radius: 0.6rem;
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 6.3rem;

  width: 100%;
  height: 10rem;

  background: linear-gradient(180deg, rgb(27 27 27 / 0%) 0%, #1b1b1b 100%);
`;
