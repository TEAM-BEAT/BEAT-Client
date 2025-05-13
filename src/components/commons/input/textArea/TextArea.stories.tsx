import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import TextArea, { TextAreaProps } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {
    value: "",
    onClick: () => {},
    onChange: () => {},
    placeholder: "플레이스 홀더",
  },
};

export default meta;
type Story = StoryObj<TextAreaProps>;

const Template: StoryFn<TextAreaProps> = (args) => {
  const [value, setValue] = useState(args.value);

  return <TextArea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const CapOn: Story = Template.bind({});
CapOn.args = { maxLength: 300 };

export const CapOff: Story = Template.bind({});
CapOff.args = {};
