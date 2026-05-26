import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChatCard } from "./ChatCard";

export default {
  title: "shared/ChatCard",
  component: ChatCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatCard>;

const Template: ComponentStory<typeof ChatCard> = (args) => (
  <ChatCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
