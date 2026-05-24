import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "./Icon";
import Calendar from "shared/assets/icons/calendar.svg";

export default {
  title: "shared/Icon",
  component: Icon,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = { Svg: Calendar };
Primary.decorators = [];
