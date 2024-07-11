import styled from "styled-components";

interface RadioButtonProps {
  label: string;
  value: number;
  checked: boolean;
  onChange: (value: number) => void;
}

const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => {
  const [date, time] = label.split("T");

  return (
    <Label checked={checked}>
      <div>
        <Text>{date}</Text>
        <DateTimeDivider />
        <Text>{time.slice(0, 5)}</Text>
      </div>

      <Input type="radio" value={value} checked={checked} onChange={() => onChange(value)} />
      <CustomRadio checked={checked} />
    </Label>
  );
};

export default RadioButton;

const Label = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1rem 1.2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;

  ${({ checked, theme }) =>
    checked &&
    `
        background-color: ${theme.colors.gray_800};
        border: 2px solid ${theme.colors.pink_400};
      `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_800};
    border-color: ${({ theme }) => theme.colors.pink_400};
  }
`;

const Input = styled.input`
  display: none;
`;

const DateTimeDivider = styled.div`
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0 1rem;

  background-color: ${({ theme }) => theme.colors.gray_500};
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
`;

const CustomRadio = styled.span<{ checked: boolean }>`
  position: relative;
  width: 2rem;
  height: 2rem;
  padding-right: 0.6rem;
  ${({ theme, checked }) =>
    checked
      ? `border: 6px solid ${theme.colors.pink_400}`
      : `border: 2px solid ${theme.colors.gray_300}`};

  border-radius: 100%;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: ${({ checked }) => (checked ? "block" : "none")};
    width: 1rem;
    height: 1rem;

    background-color: ${({ theme }) => theme.colors.white};
    transform: translate(-50%, -50%);
    border-radius: 50%;

    content: "";
  }
`;
