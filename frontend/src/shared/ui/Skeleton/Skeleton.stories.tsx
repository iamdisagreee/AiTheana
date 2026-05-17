import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "shared/Skeleton",
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  height: 200,
};
Primary.decorators = [];
export const PrimaryCircle = Template.bind({});
PrimaryCircle.args = {
  width: 200,
  height: 200,
  borderRadius: "50%",
};
PrimaryCircle.decorators = [];

export const Dark = Template.bind({});
Dark.args = { height: 200 };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
export const DarkCircle = Template.bind({});
DarkCircle.args = { width: 200, height: 200, borderRadius: "50%" };
DarkCircle.decorators = [ThemeDecorator(Theme.DARK)];
