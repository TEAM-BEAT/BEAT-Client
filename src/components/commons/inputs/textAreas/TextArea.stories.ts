import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TextArea from "./TextArea";

const meta = {
  title: "TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { onClick: fn(), placeholder: "플레이스 홀더", onChange: fn() },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CapOn: Story = {
  args: { maxLength: 300 },
};
export const CapOff: Story = {
  args: {},
};
