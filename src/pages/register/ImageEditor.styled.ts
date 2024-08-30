import styled from "styled-components";
import { Generators } from "@styles/generator";
import ReactCrop from "react-image-crop";

export const ModalContainer = styled.div`
  ${Generators.flexGenerator("column", "center", "center")}
  position: fixed;
  z-index: 1;
  gap: 2rem;

  background-color: rgb(0 0 0 / 50%);
  inset: 0;
`;

export const OriginImage = styled.img`
  width: 32rem;
`;

export const CustomReactCrop = styled(ReactCrop)`
  .ReactCrop__drag-handle {
    width: 1rem;
    height: 1rem;

    background: ${({ theme }) => theme.colors.main_pink_400};
    border: none;
  }
`;
