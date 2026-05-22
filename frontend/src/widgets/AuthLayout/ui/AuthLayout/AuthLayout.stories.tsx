import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AuthLayout } from "./AuthLayout";

export default {
  title: "shared/AuthLayout",
  component: AuthLayout,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof AuthLayout>;

const Template: ComponentStory<typeof AuthLayout> = (args) => (
  <AuthLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
