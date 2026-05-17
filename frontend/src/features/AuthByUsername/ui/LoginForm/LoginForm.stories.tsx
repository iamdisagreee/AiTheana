import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginForm from "./LoginForm";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { loginReducer } from "features/AuthByUsername/model/slice/LoginSlice";

export default {
  title: "features/LoginForm",
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    login: { username: "vova", password: "kharitonov", isLoading: false },
  }),
];

export const PrimaryError = Template.bind({});
PrimaryError.args = {};
PrimaryError.decorators = [
  StoreDecorator({
    login: {
      username: "vova",
      password: "kharitonov",
      isLoading: false,
      error: "Ошибочка",
    },
  }),
];

export const PrimaryLoading = Template.bind({});
PrimaryLoading.args = {};
PrimaryLoading.decorators = [
  StoreDecorator({
    login: {
      username: "vova",
      password: "kharitonov",
      isLoading: true,
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    login: { username: "vova", password: "kharitonov", isLoading: false },
  }),
];
