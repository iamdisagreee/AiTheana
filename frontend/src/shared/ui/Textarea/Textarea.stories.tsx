import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Textarea } from "./Textarea";

export default {
  title: "shared/Textarea",
  component: Textarea,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
