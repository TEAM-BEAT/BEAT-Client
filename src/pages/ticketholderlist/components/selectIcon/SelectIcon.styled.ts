import {
  IconCheckboxDisabledOn,
  IconCheckboxSelectedOn,
  IconCheckboxUnselectedOn,
} from "@assets/svgs";
import styled from "styled-components";

export const DeleteSelectedIcon = styled(IconCheckboxSelectedOn)`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.8rem;

  cursor: pointer;
`;

export const DeleteUnselectedIcon = styled(IconCheckboxUnselectedOn)`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.8rem;

  cursor: pointer;
`;

export const CantSelectedIcon = styled(IconCheckboxDisabledOn)`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.8rem;

  cursor: not-allowed;
`;
