import styled from "styled-components";
import { Generators } from "@styles/generator";
import ReactCrop from "react-image-crop";

export const ModalContainer = styled.div`
  ${Generators.flexGenerator("column", "center", "center")}
  position: fixed;
  z-index: 100;
  gap: 2rem;

  background-color: rgb(15 15 15 / 70%);
  inset: 0;
`;

export const OriginImage = styled.img`
  max-width: 32rem;
`;

export const CustomReactCrop = styled(ReactCrop)<{
  aspectRatio: number;
  calculatedSize: { width: number; height: number };
}>`
  position: relative;
  max-width: 32rem;
  max-height: 80vh;

  .ReactCrop__drag-handle {
    width: 1rem;
    height: 1rem;

    background: ${({ theme }) => theme.colors.main_pink_400};
    border: none;
  }

  .ReactCrop__crop-selection::before {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    width: ${({ calculatedSize }) => calculatedSize.width}rem;
    max-width: 100%;
    height: ${({ calculatedSize }) => calculatedSize.height}rem;
    max-height: 80%;

    transform: translate(-50%, -50%);
    border: 0.2rem solid ${({ theme }) => theme.colors.white};
    border-radius: 0.6rem;

    content: "";
  }
`;
