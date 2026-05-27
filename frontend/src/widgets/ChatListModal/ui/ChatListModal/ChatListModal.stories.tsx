import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChatListModal } from "./ChatListModal";

export default {
  title: "shared/ChatListModal",
  component: ChatListModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatListModal>;

const Template: ComponentStory<typeof ChatListModal> = (args) => (
  <ChatListModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
