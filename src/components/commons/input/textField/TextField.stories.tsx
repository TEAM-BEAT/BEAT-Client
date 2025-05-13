import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { numericFilter, phoneNumberFilter, priceFilter } from "../../../../utils/useInputFilter";
import TextField, { TextFieldProps } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { value: "", onClick: () => {}, placeholder: "플레이스 홀더", onChange: () => {} },
};

export default meta;
type Story = StoryObj<TextFieldProps>;
const Template: StoryFn<TextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value);

  return <TextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const DefaultCapOn: Story = Template.bind({});
DefaultCapOn.args = { maxLength: 30 };

export const DefaultCapOff: Story = Template.bind({});
DefaultCapOff.args = {};

export const Narrow: Story = Template.bind({});
Narrow.args = { narrow: true };

export const Time: Story = Template.bind({});
Time.args = { unit: "time", filter: numericFilter };

export const Ticket: Story = Template.bind({});
Ticket.args = { unit: "ticket", filter: numericFilter };

export const Amount: Story = Template.bind({});
Amount.args = { unit: "amount", filter: priceFilter };

export const Phone: Story = Template.bind({});
Phone.args = { filter: phoneNumberFilter };
