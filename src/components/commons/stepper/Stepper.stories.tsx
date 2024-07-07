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
type Story = StoryObj<typeof meta>;

const Template: StoryFn<StepperProps> = (args) => {
  const [round, setRound] = useState(args.round);

  return <Stepper {...args} round={round} setRound={setRound} />;
};

export const Default: Story = Template.bind({});
Default.args = {};
