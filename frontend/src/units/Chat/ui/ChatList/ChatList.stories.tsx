import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChatList } from "./ChatList";

export default {
  title: "shared/ChatList",
  component: ChatList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatList>;

const Template: ComponentStory<typeof ChatList> = (args) => (
  <ChatList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
