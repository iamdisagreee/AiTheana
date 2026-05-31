import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageAIText } from "./MessageAIText";

export default {
  title: "shared/MessageAIText",
  component: MessageAIText,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof MessageAIText>;

const Template: ComponentStory<typeof MessageAIText> = (args) => (
  <MessageAIText {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
