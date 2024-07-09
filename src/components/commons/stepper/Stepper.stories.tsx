import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Stepper, { StepperProps } from "./Stepper";
import { useState } from "react";

const meta = {
  title: "Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: { max: 3, round: 1 },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<StepperProps>;

const Template: StoryFn<StepperProps> = (args) => {
  const [round, setRound] = useState(1);

  const onMinusClick = () => {
    setRound((prev) => prev - 1);
  };
  const onPlusClick = () => {
    setRound((prev) => prev + 1);
  };

  return <Stepper {...args} round={round} onMinusClick={onMinusClick} onPlusClick={onPlusClick} />;
};

export const Default: Story = Template.bind({});
Default.args = {};
