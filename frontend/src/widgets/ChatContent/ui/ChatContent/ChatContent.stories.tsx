import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChatContent } from "./ChatContent";

export default {
  title: "shared/ChatContent",
  component: ChatContent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatContent>;

const Template: ComponentStory<typeof ChatContent> = (args) => (
  <ChatContent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
