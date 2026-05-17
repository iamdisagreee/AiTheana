import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SizeText } from "./Text";
import Text from "./Text";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "shared/Text",
  component: Text,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const sizeM = Template.bind({});
sizeM.args = {
  size: SizeText.M,
  text: "test",
  title: "testovich",
};

export const sizeL = Template.bind({});
sizeL.args = {
  size: SizeText.L,
  text: "test",
  title: "testovich",
};
