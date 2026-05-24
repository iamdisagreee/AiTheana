import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChatsPage from "./ChatsPage";

export default {
  title: "shared/ChatsPage",
  component: ChatsPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatsPage>;

const Template: ComponentStory<typeof ChatsPage> = (args) => (
  <ChatsPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
