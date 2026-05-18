import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./Tabs";

export default {
  title: "shared/Tabs",
  component: Tabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
