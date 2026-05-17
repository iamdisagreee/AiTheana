import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StyleDecorator } from "shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";
import LanguageSwitcher from "./LanguageSwitcher";

export default {
  title: "widgets/LanguageSwitcher",
  component: LanguageSwitcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LanguageSwitcher>;

const Template: ComponentStory<typeof LanguageSwitcher> = (args) => (
  <LanguageSwitcher {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [RouterDecorator];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [RouterDecorator, ThemeDecorator(Theme.DARK)];
