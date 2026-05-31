import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChatInput } from "./ChatInput";

export default {
  title: "shared/ChatInput",
  component: ChatInput,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatInput>;

const Template: ComponentStory<typeof ChatInput> = (args) => (
  <ChatInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
