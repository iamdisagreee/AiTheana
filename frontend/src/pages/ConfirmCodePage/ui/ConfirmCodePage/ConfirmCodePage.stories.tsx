import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConfirmCodePage from "./ConfirmCodePage";

export default {
  title: "shared/ConfirmCodePage",
  component: ConfirmCodePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ConfirmCodePage>;

const Template: ComponentStory<typeof ConfirmCodePage> = (args) => (
  <ConfirmCodePage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
