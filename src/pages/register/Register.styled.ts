import { IconPhotoDelete } from "@assets/svgs";
import { Generators } from "@styles/generator";
import { ComponentType } from "react";
import styled from "styled-components";

// 페이지 전체 레이아웃
export const RegisterContainer = styled.main`
  padding: 0 2.4rem;
`;

export const Divider = styled.div`
  width: 32.7rem;
  height: 0.1rem;

  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const FooterContainer = styled.div`
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;

export const FooterDivider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 37.5rem;
  height: 0.1rem;

  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  ${Generators.flexGenerator("row", "center", "space-between")}
  margin: 0;
  margin-bottom: 2.4rem;
`;

export const CheckboxLabel = styled.label`
  width: inherit;

  ${Generators.flexGenerator("row", "center", "space-between")}
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts["body2-normal-semi"]};
`;

export const Checkbox = styled.input`
  display: none;
`;

// 입력 Box
export const InputRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const StepperRegisterBox = styled.section<{ $marginBottom: number }>`
  ${Generators.flexGenerator("row", "center", "space-between")}
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const InputTitleWrapper = styled.div`
  gap: 1rem;
  ${Generators.flexGenerator("row", "center", "start")};
`;

export const StepperDiscription = styled.section`
  color: ${({ theme }) => theme.colors.gray_500};
  ${({ theme }) => theme.fonts["caption1-medi"]};
`;

export const TimePickerRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const BankRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const InputTitle = styled.h1`
  ${Generators.flexGenerator("row", "center", "space-between")}
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;

export const InputDescription = styled.p<{ warning?: boolean }>`
  color: ${({ theme, warning }) => (warning ? theme.colors.red : theme.colors.gray_300)};
  ${({ theme }) => theme.fonts["body2-long"]};
`;

export const CheckBox = styled.div`
  ${Generators.flexGenerator("row", "center", "space-between")}
  width: 7.5rem;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const NonCheck = styled.div`
  width: 1.8rem;
  height: 1.8rem;

  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 2px;
`;

export const FileInputWrapper = styled.div`
  position: relative;

  ${Generators.flexGenerator("row", "center", "start")}
  gap: 1.4rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const CustomFileInput = styled.label`
  ${Generators.flexGenerator()}
  width: 10.8rem;
  height: 15.4rem;

  background: ${({ theme }) => theme.colors.gray_800};
  cursor: pointer;
  border-radius: 6px;
`;

export const PreviewImageWrapper = styled.article`
  position: relative;
  width: 10.8rem;
  height: 15.4rem;
`;

export const PreviewImage = styled.img`
  width: 10.8rem;
  height: 15.4rem;
  object-fit: cover;

  border-radius: 10px;
`;

export const RemoveImageButton = styled(IconPhotoDelete)`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  width: 2.4rem;

  cursor: pointer;
`;

export const GenreContainer = styled.section`
  ${Generators.flexGenerator("row", "center", "space-between")}
`;

export const GenreItem = styled.article<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  width: 7.2rem;
  height: 7.2rem;
  padding: 1rem 2rem;
  padding: 11px 8px 6px;
  ${({ theme }) => theme.fonts["caption1-semi"]}

  color: ${({ selected, theme }) => (selected ? theme.colors.gray_900 : theme.colors.gray_400)};

  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.gray_0 : theme.colors.gray_800};
  cursor: pointer;
  border-radius: 6px;
`;

export const StyledIcon = (IconComponent: ComponentType) => styled(IconComponent)<{
  selected: boolean;
}>`
  fill: ${({ theme, selected }) => (selected ? theme.colors.main_pink_400 : theme.colors.gray_500)};
`;

export const TimePickerWrapper = styled.section`
  ${Generators.flexGenerator("column", "center", "center")}
  gap: 1.6rem;
`;

// 완료 페이지
export const RegisterCompleteLayout = styled.section`
  width: 37.4rem;
  padding: 2.4rem;
`;

export const RegisterCompleteWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12rem 2.4rem 22rem;
`;

export const RegisterCompleteTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading3}
  text-align: center;
`;

export const ReigsterCompleteSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-normal-medi"]}
  text-align: center;
`;
