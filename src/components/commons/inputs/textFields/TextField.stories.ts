import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TextField from "./TextField";

const meta = {
  title: "TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "플레이스 홀더" },
};

export const Narrow: Story = {
  args: { placeholder: "플레이스 홀더", narrow: true },
};

export const Unit: Story = {
  args: { placeholder: "플레이스 홀더", unit: "time" },
};
