import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from "./Logo";

export default {
  title: "shared/Logo",
  component: Logo,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => (
  <Logo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
