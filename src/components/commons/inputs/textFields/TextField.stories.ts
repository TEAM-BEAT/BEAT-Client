import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TextField from "./TextField";
import { phoneNumberFilter } from "../../../../utils/useInputFiter";

const meta = {
  title: "TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { onClick: fn(), placeholder: "플레이스 홀더", onChange: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { maxLength: 5 },
};

export const Narrow: Story = {
  args: { narrow: true },
};

export const Unit: Story = {
  args: { unit: "time" },
};

export const Phone: Story = {
  args: { filter: phoneNumberFilter, placeholder: "전화번호를 입력하세요" },
};
