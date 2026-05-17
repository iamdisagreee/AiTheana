import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StyleDecorator } from "shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";
import Navbar from "./Navbar";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
  title: "widgets/Navbar",
  component: Navbar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const PrimaryLogin = Template.bind({});
PrimaryLogin.args = {};
PrimaryLogin.decorators = [StoreDecorator({ user: { authData: undefined } })];

export const DarkLogin = Template.bind({});
DarkLogin.args = {};
DarkLogin.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({ user: { authData: undefined } }),
];

export const PrimaryLogout = Template.bind({});
PrimaryLogout.args = {};
PrimaryLogout.decorators = [
  StoreDecorator({ user: { authData: { id: "1", username: "vova" } } }),
];

export const DarkLogout = Template.bind({});
DarkLogout.args = {};
DarkLogout.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({ user: { authData: { id: "1", username: "vova" } } }),
];
