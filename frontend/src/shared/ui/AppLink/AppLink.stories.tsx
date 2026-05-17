import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import AppLink, { AppLinkTheme } from "./AppLink";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";

export default {
  title: "shared/AppLink",
  component: AppLink,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
  children: "TEST",
  theme: AppLinkTheme.PRIMARY,
};
PrimaryLight.decorators = [RouterDecorator];

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
  children: "TEST",
  theme: AppLinkTheme.SECONDARY,
};
SecondaryLight.decorators = [RouterDecorator];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: "TEST",
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [RouterDecorator, ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: "TEST",
  theme: AppLinkTheme.SECONDARY,
};
SecondaryDark.decorators = [RouterDecorator, ThemeDecorator(Theme.DARK)];
