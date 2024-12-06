import styled from "styled-components";
import { IcRefresh, IconCheckboxSelectedOn, IconCheckboxUnselectedOn } from "@assets/svgs";

export const CheckBoxWrapper = styled.section`
  display: flex;
`;

export const CheckBox = styled.input`
  display: none;
`;

export const SelectIcon = styled(IconCheckboxSelectedOn)`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
`;

export const UnSelectIcon = styled(IconCheckboxUnselectedOn)`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
`;
