import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChatDetailsPage from "./ChatDetailsPage";

export default {
  title: "shared/ChatDetailsPage",
  component: ChatDetailsPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatDetailsPage>;

const Template: ComponentStory<typeof ChatDetailsPage> = (args) => (
  <ChatDetailsPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
