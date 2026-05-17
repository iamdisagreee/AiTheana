import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Modal from "./Modal";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children:
    "RANDOM TEXT RANDOM TEXTRANDOM TEXTRANDOM TEXTRANDOM TEXT RANDOM TEXTRANDOM TEXTRANDOM TEXTRANDOM TEXTRANDOM TEXT",
  isOpen: true,
};

export const Dark = Template.bind({});
Dark.args = {
  children:
    "RANDOM TEXT RANDOM TEXTRANDOM TEXTRANDOM TEXTRANDOM TEXT RANDOM TEXTRANDOM TEXTRANDOM TEXTRANDOM TEXTRANDOM TEXT",
  isOpen: true,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
