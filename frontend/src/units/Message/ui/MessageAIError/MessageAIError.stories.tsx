import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageAIError } from "./MessageAIError";

export default {
  title: "shared/MessageAIError",
  component: MessageAIError,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof MessageAIError>;

const Template: ComponentStory<typeof MessageAIError> = (args) => (
  <MessageAIError {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
