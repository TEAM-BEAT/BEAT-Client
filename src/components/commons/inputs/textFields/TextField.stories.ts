import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TextField from "./TextField";
import { numericFilter, phoneNumberFilter, priceFilter } from "../../../../utils/useInputFilter";

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

export const DefaultCapOn: Story = {
  args: { maxLength: 30 },
};

export const DefaultCapOff: Story = {
  args: {},
};

export const Narrow: Story = {
  args: { narrow: true },
};

export const Time: Story = {
  args: { unit: "time", filter: numericFilter },
};

export const Ticket: Story = {
  args: { unit: "ticket", filter: numericFilter },
};

export const Amount: Story = {
  args: { unit: "amount", filter: priceFilter },
};

export const Phone: Story = {
  args: { filter: phoneNumberFilter },
};
