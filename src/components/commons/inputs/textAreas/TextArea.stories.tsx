import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TextArea from "./TextArea";
import { useState } from "react";

const meta = {
  title: "TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { value: "", onClick: fn(), placeholder: "플레이스 홀더", onChangeValue: fn() },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [value, setValue] = useState(args.value);

  return <TextArea {...args} value={value} onChangeValue={setValue} />;
};

export const CapOn: Story = Template.bind({});
CapOn.args = { maxLength: 300 };

export const CapOff: Story = Template.bind({});
CapOff.args = {};
