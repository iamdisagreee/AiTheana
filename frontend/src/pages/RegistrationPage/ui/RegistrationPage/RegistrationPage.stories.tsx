import { ComponentStory, ComponentMeta } from "@storybook/react";
import RegistrationPage from "./RegistrationPage";

export default {
  title: "pages/RegistrationPage",
  component: RegistrationPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof RegistrationPage>;

const Template: ComponentStory<typeof RegistrationPage> = (args) => (
  <RegistrationPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
