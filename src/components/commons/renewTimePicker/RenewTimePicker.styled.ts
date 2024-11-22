import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 11px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledButton = styled.button<{ $isActive: boolean }>`
  padding: 6px 50.5px;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.black : theme.colors.gray_400)};
  font-weight: 500;
  font-size: 13.2px;

  background-color: ${({ theme, $isActive }) => ($isActive ? "#fff" : theme.colors.gray_700)};
  border-radius: 100px;
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 13.4px;
`;

export const GridTitle = styled.p`
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  font-weight: 500;

  &:first-child {
    margin-top: 52px;
  }

  &:last-child {
    margin-top: 84px;
  }
`;

export const GridButton = styled.button<{ $isActive: boolean }>`
  width: 32px;
  height: 32px;

  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.black : theme.colors.gray_400)};
  text-align: center;

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.white : theme.colors.gray_700};
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;
