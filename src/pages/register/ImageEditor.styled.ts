import styled from "styled-components";
import { Generators } from "@styles/generator";

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

export const CropImage = styled.div`
  font-size: 3rem;
`;
