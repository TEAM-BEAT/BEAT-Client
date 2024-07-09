import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Bank, { BankProps } from "./Bank";

const meta = {
  title: "Bank",
  component: Bank,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Bank>;

export default meta;
type Story = StoryObj<BankProps>;

const Template: StoryFn<BankProps> = (args) => {
  return <Bank />;
};

export const Default: Story = Template.bind({});
Default.args = {};
