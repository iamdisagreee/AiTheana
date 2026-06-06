import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button, { ButtonSize, ButtonTheme } from "./Button";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "shared/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "TEST",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "TEST",
  theme: ButtonTheme.CLEAR,
};

export const OutlineLight = Template.bind({});
OutlineLight.args = {
  children: "TEST",
  theme: ButtonTheme.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: "TEST",
  theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const background = Template.bind({});
background.args = {
  children: "TEST",
  theme: ButtonTheme.BACKGROUND,
};

export const backgroundSquareSizeM = Template.bind({});
backgroundSquareSizeM.args = {
  children: ">",
  theme: ButtonTheme.BACKGROUND,
  square: true,
  size: ButtonSize.M,
};

export const backgroundSquareSizeL = Template.bind({});
backgroundSquareSizeL.args = {
  children: ">",
  theme: ButtonTheme.BACKGROUND,
  square: true,
  size: ButtonSize.L,
};

export const backgroundSquareSizeXL = Template.bind({});
backgroundSquareSizeXL.args = {
  children: ">",
  theme: ButtonTheme.BACKGROUND,
  square: true,
  size: ButtonSize.XL,
};

export const OutlineLightDisabled = Template.bind({});
OutlineLightDisabled.args = {
  children: "TEST",
  theme: ButtonTheme.OUTLINE,
  disabled: true,
};

export const OutlineDarkDisabled = Template.bind({});
OutlineDarkDisabled.args = {
  children: "TEST",
  theme: ButtonTheme.OUTLINE,
  disabled: true,
};
OutlineDarkDisabled.decorators = [ThemeDecorator(Theme.DARK)];
