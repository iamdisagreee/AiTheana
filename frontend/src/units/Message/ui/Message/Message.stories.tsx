import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Message } from "./Message";

export default {
  title: "shared/Message",
  component: Message,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (
  <Message {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
