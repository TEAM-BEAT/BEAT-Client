import { IconTextfiedlDelete } from "@assets/svgs";
import { Generators } from "@styles/generator";
import styled from "styled-components";

export const TextFieldLayout = styled.section<{ $narrow: boolean | undefined }>`
  position: relative;
  width: ${({ $narrow }) => ($narrow ? "13.6rem" : "32.7rem")};
`;

export const TextFieldWrapper = styled.article`
  ${Generators.flexGenerator("row", "center", "center")}
`;

export const TextFieldInput = styled.input<{ $narrow: boolean | undefined; $isDisabled?: boolean }>`
  width: 100%;
  height: ${({ $narrow }) => ($narrow ? "4.2rem" : "4.8rem")};
  padding: 0 1.6rem;

  color: ${({ theme, $isDisabled }) => ($isDisabled ? theme.colors.gray_600 : theme.colors.gray_0)};

  background: ${({ theme }) => theme.colors.gray_800};
  border: 1px solid transparent;
  border-radius: 0.6rem;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_600};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.gray_0};
  }
`;

export const TextClear = styled(IconTextfiedlDelete)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 2.4rem;

  cursor: pointer;
`;

export const TextUnit = styled.p`
  position: absolute;
  right: 1.6rem;
  width: 2.4rem;
  height: 2.4rem;

  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const ToggleVisibilityIcon = styled.section`
  position: absolute;
  right: 1.6rem;

  width: 2.4rem;
`;

export const TextCap = styled.p`
  ${Generators.flexGenerator("row", "center", "end")}

  width: 100%;
  margin: 0;
  margin-top: 0.6rem;

  color: ${({ theme }) => theme.colors.gray_500};
  text-align: right;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const SearchDropDownWrapper = styled.div`
  position: absolute;
  top: 6.2rem;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 32.7rem;
  max-height: 22.8rem;
  padding: 1.4rem 2rem;
  overflow: hidden scroll;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 1px solid black;
  border-radius: 6px;

  &::-webkit-scrollbar {
    width: 5px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray_700}; /* 트랙 배경 */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray_500}; /* 손잡이 색상 */
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray_600}; /* 호버 시 손잡이 색상 */
  }
`;

export const DropDownItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  width: 29.9rem;
  padding: 0.6rem;

  border-radius: 0.4rem;
`;

export const RoadName = styled.p`
  align-self: stretch;

  color: ${({ theme }) => theme.colors.pink_200};
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  white-space: nowrap;
`;

export const PostName = styled.p`
  align-self: stretch;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const Divider = styled.div`
  flex-shrink: 0;
  width: 28.7rem;
  height: 0.1rem;

  background-color: #3e3e3e;
`;
