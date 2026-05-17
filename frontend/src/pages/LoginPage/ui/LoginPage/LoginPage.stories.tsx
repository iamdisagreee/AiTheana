import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginPage from "./LoginPage";

export default {
  title: "shared/LoginPage",
  component: LoginPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => (
  <LoginPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
