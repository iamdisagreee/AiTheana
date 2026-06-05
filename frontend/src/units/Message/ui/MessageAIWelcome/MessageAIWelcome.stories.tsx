import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageAIWelcome } from "./MessageAIWelcome";

export default {
  title: "shared/MessageAIWelcome",
  component: MessageAIWelcome,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof MessageAIWelcome>;

const Template: ComponentStory<typeof MessageAIWelcome> = (args) => (
  <MessageAIWelcome {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
